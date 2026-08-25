<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSayings } from '../composables/useSayings'

const { state, load } = useSayings()
const current = ref('人类永远不行')
const swapping = ref(false)

const isLoading = computed(() => !state.value.loaded && !state.value.error)
const displaySaying = computed(() => current.value)

function pick() {
  const { list } = state.value
  if (!list.length) return
  current.value = list[Math.floor(Math.random() * list.length)]
  swapping.value = true
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      swapping.value = false
    })
  })
}

// 加载完成后随机揭晓一句，作为本期封面引述
onMounted(async () => {
  await load()
  const { list } = state.value
  if (list.length) {
    current.value = list[Math.floor(Math.random() * list.length)]
  }
})
</script>

<template>
  <section class="cover">
    <div class="cover__kicker">
      <span class="cover__kicker-dot" aria-hidden="true"></span>
      本期揭晓 · 何锐讲话实录
    </div>

    <div class="cover__quote" :class="{ 'is-swapping': swapping }">
      <h1 class="cover__saying">{{ displaySaying }}</h1>
      <span class="cover__qmark" aria-hidden="true">”</span>
    </div>

    <div class="cover__actions">
      <button class="btn-next" :disabled="isLoading" @click="pick">
        <span class="btn-next__label">再来一节</span>
        <span class="btn-next__arr">NEXT →</span>
      </button>
      <RouterLink to="/sayings" class="btn-ghost">翻看全部语录 →</RouterLink>
    </div>

    <div class="cover__meta">
      <template v-if="isLoading">
        <span class="cover__spin" aria-hidden="true"></span>
        <span>正在调取档案…</span>
      </template>
      <template v-else-if="state.error">
        <span>档案加载失败：{{ state.error }}</span>
      </template>
      <template v-else>
        <span>已收录 {{ state.list.length }} 条</span>
        <span>{{
          state.chars ? `合计 ${state.chars.toLocaleString()} 字` : ''
        }}</span>
        <span>HR ARCHIVE · 持续连载</span>
      </template>
    </div>
  </section>
</template>

<style scoped>
.cover {
  max-width: 840px;
  margin: 0 auto;
  padding: 64px 24px 96px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 320px);
  justify-content: center;
}

.cover__kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-bottom: 34px;
}

.cover__kicker-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}

.cover__quote {
  position: relative;
  padding-right: 20px;
}

.cover__saying {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(34px, 6.4vw, 62px);
  line-height: 1.32;
  letter-spacing: 0.01em;
  color: var(--ink);
  text-wrap: balance;
}

.cover__qmark {
  position: absolute;
  right: 0;
  top: -0.6em;
  font-family: var(--font-display);
  font-size: clamp(60px, 9vw, 96px);
  color: var(--accent);
  opacity: 0.85;
}

/* 换句时的轻微上浮动效 */
.cover__quote.is-swapping .cover__saying {
  animation: rise 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cover__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 48px;
  padding-top: 30px;
  border-top: 1px solid var(--rule);
}

.btn-next {
  appearance: none;
  border: 1px solid var(--ink);
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-ui);
  padding: 14px 26px 14px 30px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 22px;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.btn-next:hover {
  background: var(--accent);
  border-color: var(--accent);
}
.btn-next:active {
  transform: translateY(1px);
}
.btn-next:disabled {
  opacity: 0.5;
  cursor: wait;
}
.btn-next__arr {
  font-size: 13px;
  letter-spacing: 0.2em;
  opacity: 0.85;
}

.btn-ghost {
  color: var(--ink-soft);
  text-decoration: none;
  font-size: 15px;
  padding: 14px 8px;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.btn-ghost:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.cover__meta {
  margin-top: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 26px;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--ink-faint);
}

.cover__spin {
  width: 12px;
  height: 12px;
  border: 2px solid var(--rule);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>