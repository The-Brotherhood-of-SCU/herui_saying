<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSayings } from '../composables/useSayings'

const route = useRoute()
const router = useRouter()
const { state, load } = useSayings()

const content = computed(() => decodeURIComponent(route.params.content || ''))

// 「再读一条」：随机跳到另一条语录的卡片
function readAnother() {
  load().then(({ list }) => {
    if (!list.length) return
    const next = list[Math.floor(Math.random() * list.length)]
    router.push(`/card/${encodeURIComponent(next)}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
</script>

<template>
  <section class="cardpage">
    <RouterLink to="/sayings" class="btn-back">← 返回目录</RouterLink>

    <article class="tcard">
      <div class="tcard__rule" aria-hidden="true"></div>
      <span class="tcard__mark" aria-hidden="true">“</span>
      <h1 class="tcard__text">{{ content }}</h1>
      <div class="tcard__byline">
        <span class="tcard__byline-rule" aria-hidden="true"></span>
        <span>—— 何锐 HeRui</span>
      </div>
      <div class="tcard__foot">
        <span>VOL. HR · SAYING ARCHIVE</span>
        <button class="tcard__again" @click="readAnother">再读一条 →</button>
      </div>
    </article>
  </section>
</template>

<style scoped>
.cardpage {
  max-width: 700px;
  margin: 0 auto;
  padding: 44px 24px 120px;
}

.btn-back {
  display: inline-block;
  color: var(--ink-soft);
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.06em;
  padding: 10px 4px;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.btn-back:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tcard {
  margin-top: 40px;
  background: var(--card-bg);
  border: 1px solid var(--rule);
  position: relative;
  padding: clamp(40px, 7vw, 72px) clamp(28px, 7vw, 68px) 34px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02), 0 18px 40px -30px rgba(25, 23, 19, 0.35);
}

.tcard__rule {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--accent);
}

.tcard__mark {
  font-family: var(--font-display);
  font-size: clamp(70px, 10vw, 110px);
  line-height: 0.5;
  display: block;
  color: var(--accent);
  margin-bottom: 22px;
}

.tcard__text {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(24px, 4.4vw, 34px);
  line-height: 1.6;
  letter-spacing: 0.015em;
  color: var(--ink);
  margin: 0 0 40px;
  text-wrap: balance;
}

.tcard__byline {
  color: var(--ink-soft);
  font-family: var(--font-display);
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.tcard__byline-rule {
  width: 40px;
  height: 1px;
  background: var(--ink);
}

.tcard__foot {
  margin-top: 36px;
  padding-top: 18px;
  border-top: 1px solid var(--rule);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.tcard__again {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--accent);
  letter-spacing: 0.04em;
  padding: 6px 0;
}
.tcard__again:hover {
  text-decoration: underline;
}
</style>