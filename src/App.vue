<script setup>
// 站点级布局：报头(masthead) + 舞台(视图) + 页脚(footer)
</script>

<template>
  <div class="site">
    <header class="masthead">
      <div class="masthead__rule" aria-hidden="true"></div>
      <div class="masthead__inner">
        <div class="masthead__topslip">
          <span>HERUI'S SAYING · ISSUE Nº 001</span>
          <span class="masthead__dateline">持续连载 / ONGOING</span>
        </div>
        <div class="masthead__row">
          <RouterLink to="/" class="brand" aria-label="锐评 · 首页">
            <span class="brand__cn">锐评</span>
            <span class="brand__en">R U I &nbsp;／&nbsp; S A Y I N G</span>
          </RouterLink>
          <nav class="nav">
            <RouterLink to="/" class="nav__link" :class="{ 'is-active': $route.name === 'home' }">首页</RouterLink>
            <RouterLink to="/sayings" class="nav__link" :class="{ 'is-active': $route.name === 'sayings' || $route.name === 'card' }">全部语录</RouterLink>
            <a class="nav__link" href="https://github.com/The-Brotherhood-of-SCU/herui_saying" target="_blank" rel="noopener">GitHub ↗</a>
          </nav>
        </div>
      </div>
      <div class="masthead__rule masthead__rule--bottom" aria-hidden="true"></div>
    </header>

    <main class="stage">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="footer">
      <div class="footer__inner">
        <p class="footer__title">锐评 <span class="footer__en">RUI · SAYING</span></p>
        <p class="footer__links">
          <a href="https://github.com/The-Brotherhood-of-SCU/herui_saying_text" target="_blank" rel="noopener">数据源 / API</a>
          <a href="https://github.com/The-Brotherhood-of-SCU/herui_saying_text" target="_blank" rel="noopener">贡献语录</a>
          <a href="https://github.com/The-Brotherhood-of-SCU/herui_saying" target="_blank" rel="noopener">本站源码</a>
        </p>
        <p class="footer__legal">© The Brotherhood of SCU · HERUI'S SAYING ARCHIVE 2026</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.stage {
  flex: 1;
}
</style>