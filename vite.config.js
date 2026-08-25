import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages: 站点部署在 https://scubro.dev/herui_saying/ 子路径下
// 因此 base 必须为 '/herui_saying/'；工作流把 Vite 产物部署到 build/ 目录
export default defineConfig({
  base: '/herui_saying/',
  plugins: [vue()],
  build: {
    outDir: 'build',
    emptyOutDir: true
  },
  server: {
    // 开发跨域直接把数据源代理到本域，避免在浏览器层面发跨域请求
    proxy: {
      '/herui_saying_text': {
        target: 'https://scubro.dev',
        changeOrigin: true
      }
    }
  }
})