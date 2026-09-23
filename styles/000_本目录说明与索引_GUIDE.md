# styles 目录说明与索引

**2026-09-23（页头承载 6 项导航）**

- `components.css`｜`.site-header` 网格由 `1fr : auto : 1fr` 调为 **`0.55fr : auto : 1.45fr`**
  （品牌块只需约 150px，右侧要放"信任语 + 和 Packy 聊聊 + 视图切换 + 登录"四件）。
- `.primary-nav` 间距收窄到 `clamp(0.7rem, 1.5vw, 1.5rem)` 并禁止折行；`.header-actions` 间距 0.75rem、
  子项 `flex: 0 0 auto`——不这样做，"视图切换"会被挤窄、内部文字折行，把页头从 **76px 撑到 112px**，
  连带影响抽屉起点与首屏高度（实测过）。
- 新增 `.header-tagline`（信任语）与 `.header-packy`（"和 Packy 聊聊"按钮，按视图给底色：
  标准视图深色页头用浅底、空间视图浅色页头用深底），不使用只在 `.standard-home` 作用域内的 `.btn`。
- 右上角**分级让位**：≤1400px 收起信任语、≤1300px 收起"登录"、≤1220px 收起整条导航（既有规则）。
  实测 1600/1512/1440/1360/1280/1200 六档：页头恒为 **76px 单行、无重叠、无横向溢出**。

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

**2026-09-23（Owner 反馈三处界面问题）**

1. `spatial-ai.css`｜`.conversation-drawer__inner`：改为**半透明**（`rgba(255,255,255,.82)` +
   `backdrop-filter: blur(18px) saturate(150%)`），并把抽屉内所有字号上调约 20%
   （正文 `.message` 0.62→0.78rem、上下文 `dd` 0.58→0.74rem、标题 strong 0.74→0.9rem 等）。
   原因：Owner 反馈"字太小、要能看见后面的页面"。
2. `components.css`｜**Packy 完整对话改为浮层（2026-09-23 晚修订）**：
   最初是 `.app-shell.conversation-open .app-body { padding-right: min(400px,92vw) }`——打开时
   **页面让出右侧一条**而不是被盖住（当时的 Owner 反馈："点出来之后点不到别的地方"）。
   后来 Owner 反馈"弹出时挤压左边、字体和界面都在晃"，**该让位规则已删除**：面板现在是
   **直接盖在页面上方的半透明浮层**（`.conversation-drawer__inner` 的 rgba(255,255,255,.82) +
   backdrop-filter blur(18px)），页面布局完全不动，因此不再有折行抖动。
   盖住页面的代价由「未固定时点面板外即收起」来兜住（见 `components/packy/ConversationDrawer.tsx`）。
   `.app-body` 上原有的 `transition: padding-right` 一并删除（已无用途）。
3. **版心拉宽**：`standard-home.css` 的 `--max` 由 1200px → **1440px**；
   `spatial-ai.css` 的 `.main-focus-view` 由 `min(62%,1040px)` → **`min(74%,1360px)`**、
   `.packy-presence` 由 `min(64%,900px)` → **`min(74%,1200px)`**；响应式断点 1180 → 1280。
   原因：Owner 反馈"左右总体感觉很窄"（实测 1920 宽屏下空间视图主内容仅 1040px、标准视图 1200px）。

本目录保存全站 Design Tokens（设计变量）、基础样式和组件样式。首轮保持简单，不建立庞大设计系统。
统一管理 spacing（间距）、radius（圆角）、typography（排版）、surface（表面）、background（背景）、shadow（阴影）、z-index（层级）与 motion duration（动效时长）。
Spatial View（空间视图）的母版与动态上下文模块样式可独立放置，但必须继续使用上述全站变量并保持 reduced-motion（低动态）降级。
`standard-home.css` 仅作用于标准视图容器；可新增 `standard-pages.css` 保存独立页面样式，必须限制作用域，避免影响空间视图。
