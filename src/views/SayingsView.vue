<script setup>
import { computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useSayings } from '../composables/useSayings'

const { state, load } = useSayings()

// 目录式列表：把地址栏状态呈现为「当期第几句」，开箱即读
const rows = computed(() =>
  state.value.list.map((s, i) => ({ no: String(i + 1).padStart(2, '0'), text: s }))
)

watch(
  () => !state.value.loaded,
  (need) => {
    if (need && !state.value.error) load()
  },
  { immediate: true }
)
</script>

<template>
  <section class="index">
    <header class="index__head">
      <span class="index__label">INDEX · 目录</span>
      <h1 class="index__title">全部语录</h1>
      <p class="index__note">
        共 {{ state.list.length }} 条 · 与纸刊同源的锐评档案，点击进入单句卡片
      </p>
    </header>

    <div v-if="!state.loaded && !state.error" class="index__loading">
      <span class="cover-spin" aria-hidden="true"></span>
      <span>正在调取档案…</span>
    </div>
    <div v-else-if="state.error" class="index__error">
      档案加载失败：{{ state.error }}
    </div>

    <ol v-else class="index__list">
      <li v-for="row in rows" :key="row.no" class="index__row">
        <RouterLink :to="`/card/${encodeURIComponent(row.text)}`" class="index__rowlink">
          <span class="index__num">{{ row.no }}</span>
          <span class="index__text">{{ row.text }}</span>
          <span class="index__arrow" aria-hidden="true">→</span>
        </RouterLink>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.index {
  max-width: 860px;
  margin: 0 auto;
  padding: 56px 24px 120px;
}

.index__head {
  border-bottom: 1px solid var(--rule);
  padding-bottom: 28px;
  margin-bottom: 8px;
}

.index__label {
  font-size: 13px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
}

.index__title {
  font-family: var(--font-display);
  font-size: clamp(30px, 4.6vw, 46px);
  font-weight: 700;
  margin: 10px 0 6px;
  color: var(--ink);
}

.index__note {
  margin: 0;
  font-size: 14px;
  color: var(--ink-faint);
  letter-spacing: 0.04em;
}

.index__loading,
.index__error {
  padding: 60px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink-soft);
  font-size: 15px;
}

.index__error {
  color: #a03020;
}

.cover-spin {
  width: 13px;
  height: 13px;
  border: 2px solid var(--rule);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.index__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.index__row {
  border-bottom: 1px solid var(--rule);
}

.index__rowlink {
  display: grid;
  grid-template-columns: 60px 1fr 28px;
  align-items: start;
  gap: 18px;
  padding: 20px 6px;
  text-decoration: none;
  color: var(--ink);
  transition: padding-left 0.2s, background 0.2s;
}

.index__row:hover .index__rowlink {
  background: var(--card-bg);
  padding-left: 16px;
}

.index__num {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--accent);
  letter-spacing: 0.05em;
  padding-top: 2px;
}

.index__text {
  font-family: var(--font-display);
  font-size: 19px;
  line-height: 1.6;
  letter-spacing: 0.02em;
}

.index__arrow {
  color: var(--ink-faint);
  font-size: 18px;
  transition: color 0.2s, transform 0.2s;
}
.index__row:hover .index__arrow {
  color: var(--accent);
  transform: translateX(4px);
}
</style>