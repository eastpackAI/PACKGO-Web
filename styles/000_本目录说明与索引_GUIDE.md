# styles 目录说明与索引

**2026-09-23（Owner 反馈三处界面问题）**

1. `spatial-ai.css`｜`.conversation-drawer__inner`：改为**半透明**（`rgba(255,255,255,.82)` +
   `backdrop-filter: blur(18px) saturate(150%)`），并把抽屉内所有字号上调约 20%
   （正文 `.message` 0.62→0.78rem、上下文 `dd` 0.58→0.74rem、标题 strong 0.74→0.9rem 等）。
   原因：Owner 反馈"字太小、要能看见后面的页面"。
2. `components.css`｜新增 `.app-shell.conversation-open .app-body { padding-right: min(400px,92vw) }`：
   Packy 完整对话打开时，**页面让出右侧一条**而不是被盖住（Owner 反馈"点出来之后点不到别的地方"）。
   ≤900px 不挤（抽屉本就占满）。
3. **版心拉宽**：`standard-home.css` 的 `--max` 由 1200px → **1440px**；
   `spatial-ai.css` 的 `.main-focus-view` 由 `min(62%,1040px)` → **`min(74%,1360px)`**、
   `.packy-presence` 由 `min(64%,900px)` → **`min(74%,1200px)`**；响应式断点 1180 → 1280。
   原因：Owner 反馈"左右总体感觉很窄"（实测 1920 宽屏下空间视图主内容仅 1040px、标准视图 1200px）。

本目录保存全站 Design Tokens（设计变量）、基础样式和组件样式。首轮保持简单，不建立庞大设计系统。
统一管理 spacing（间距）、radius（圆角）、typography（排版）、surface（表面）、background（背景）、shadow（阴影）、z-index（层级）与 motion duration（动效时长）。
Spatial View（空间视图）的母版与动态上下文模块样式可独立放置，但必须继续使用上述全站变量并保持 reduced-motion（低动态）降级。
`standard-home.css` 仅作用于标准视图容器；可新增 `standard-pages.css` 保存独立页面样式，必须限制作用域，避免影响空间视图。
