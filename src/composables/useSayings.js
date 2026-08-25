import { ref } from 'vue'

// 数据源新域名地址：与站点同源(scubro.dev)，消除跨域
// 老域名 the-brotherhood-of-scu.github.io/... 会 301 跳转到 scubro.dev，跨域跳转正是 CORS 失败根源
const DATA_URL = 'https://scubro.dev/herui_saying_text/'

const state = ref({ list: [], chars: 0, loaded: false, error: null })
let inflight = null

function parse(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('#'))
}

// 全局单例：页面级切换时复用已拉取的数据，避免每次路由都重新请求
export function useSayings() {
  async function load(force = false) {
    if (state.value.loaded && !force) return state.value
    if (inflight) return inflight

    inflight = (async () => {
      try {
        const res = await fetch(DATA_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        state.value = {
          list: parse(text),
          chars: text.replace(/[\s#]/g, '').length,
          loaded: true,
          error: null
        }
      } catch (e) {
        state.value.error = (e && e.message) || String(e)
      } finally {
        inflight = null
      }
      return state.value
    })()

    return inflight
  }

  return { state, load }
}