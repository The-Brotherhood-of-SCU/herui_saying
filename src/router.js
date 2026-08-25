import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import SayingsView from './views/SayingsView.vue'
import CardView from './views/CardView.vue'

// 使用 hash 历史：部署在 GitHub Pages 静态托管下，无需服务端 rewrite，
// 深链接 / 刷新任意子路由都不会 404。
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/sayings', name: 'sayings', component: SayingsView },
    { path: '/card/:content', name: 'card', component: CardView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router