# 锐评 · HeRui's Saying

何锐锐评合集档案，现代杂志风格 · Vue 3 重构版。

## 在线访问

- 站点：<https://scubro.dev/herui_saying/>
- 数据源：<https://scubro.dev/herui_saying_text/>

> 2026 迁移说明：组织域名已切换至 `scubro.dev`，数据接口一律使用新域名
> （与本站同源），彻底消除由旧 GitHub Pages 域名 301 跳转引起的跨域(CORS)问题。

## 技术栈

- **Vue 3** + **Vue Router**（hash 模式，静态托管下刷新不 404）
- **Vite** 构建，产物输出到 `build/`，`base = /herui_saying/`

## 本地开发

```bash
npm install
npm run dev     # 开发，默认 http://localhost:5173/herui_saying/
npm run build   # 生产构建，输出到 build/
npm run preview # 本地预览构建产物
```

## 结构

```
src/
  composables/useSayings.js  # 单例数据加载（数据源新域名，跨页复用）
  views/HomeView.vue         # 首页 · 杂志封面大引述 + 再来一节
  views/SayingsView.vue      # 全部语录 · 目录式索引
  views/CardView.vue         # 单句卡片
  assets/main.css            # 杂志风设计系统
```

## 部署

push 到 `master` 后由 `.github/workflows/main.yml` 自动构建并部署到 GitHub Pages。

## 数据贡献

语录存放于 [herui_saying_text](https://github.com/The-Brotherhood-of-SCU/herui_saying_text)，
以 `#` 开头的行视为注释。