# styles 目录说明与索引

**2026-09-25（发布前浏览器收口）**

- `components.css`｜手机页头在 ≤430px 收起文字版 Packy 入口、收紧视图切换，只保留足够明确的短标签，
  让品牌、Packy 快捷入口和双视图切换都完整落在 390px 视口内。
- `standard-home.css`｜工作台六步在窄屏按视口中线选择“最近经过”的步骤，
  即使快速滑动越过两段，也只会落到真实的第 2 或第 3 步，不复用上一次已离开步骤的位置。

**2026-09-24（独立页面内容入口）**：`standard-pages.css` 为详情页共用的工作台定位短句提供
轻量排版；只作用于 `.standard-detail`，不改空间视图或现有配色。

**2026-09-24（色系转冷 + 三层固定背景：底 / 图案 / 网格）**

- `tokens.css`｜全局中性色由"暖灰暖白"改为**冷中性**（ink #eef0f2、canvas-deep #0a0c10、
  line rgba(232,236,240,…)），暖色只保留为唯一强调色 `--color-accent`。
- `components.css`｜新增 **`.page-backdrop`**：`position: fixed` 的三层背景
  ① 冷白底色 ② 极淡色块图案（三块 radial-gradient，冷蓝灰为主 + 一处品牌暖色）与
  大号水印字 `PACKGO`（2.8% 透明度）③ 32px 细网格（1px 线、4.5% 透明度）。
  仅标准视图显示（`.view-standard .page-backdrop { display: block }`）。
  `.app-shell.view-standard` 底色改为 `transparent`（底色交给背景层），
  `.app-shell.view-standard .app-body` 提升到 `position: relative; z-index: 1` 让内容在背景之上。
- `components.css`｜`.site-header` 深色改为**冷近黑** `rgba(9,11,15,.88)` + `saturate(140%) blur(18px)`；
  `.packy-launcher` 底色 `#0f1216`。
- `standard-home.css`｜**不再自己画底与网格**（原来画在滚动容器上，会随滚动移动）；
  改为 `background: transparent`，底纹统一由固定背景层提供。
  卡片新增**默认三层阴影**（`--shadow-card`），hover 用 `--shadow-lift`；色值同步转冷
  （--bg #f6f7f9、--line #e3e6ea、--ink #14171b 等）。
- `spatial-ai.css`｜Packy 抽屉改为**冷玻璃**：底 `rgba(252,253,254,.86)` + 冷灰边线 +
  冷墨 `#16202a`，投影由偏蓝大光晕收成两层克制阴影，与整站配色融合。

**2026-09-24（右下角 Packy 常驻入口）**

- `components.css`｜新增 `.packy-launcher`（+ `__orb` / `__label` / `__dot`）：右下角固定胶囊按钮，
  `z-index: 35`（在完整对话面板 40 之下）、`right/bottom: clamp(16px, 2.2vw, 28px)`；
  面板打开时用 `.is-open` 变透明并禁止点击（保留占位，避免抖动）；≤560px 只留圆标与绿点。
- `.view-spatial .packy-launcher { display: none }`：空间视图已有自己的 Packy 常驻条，不重复出现。

**2026-09-24（页头吸顶固定）**

- `tokens.css`｜新增 `html { scroll-padding-top: 88px }`：页头吸顶后，页面内锚点跳转
  （导航点"产品品类"→ `#categories`）要留出页头高度，否则章节标题会被压在页头下面。
- `components.css`｜`.site-header` 由 `position: relative` 改为 **`position: sticky; top: 0`**（全局生效）。
  之前的 `position: sticky` 写在 `.standard-home .site-header` 里，而页头渲染在 `.standard-home` **之外**，
  那条规则从未命中，所以滚动时页头会被带走。
- `components.css`｜`.app-shell` 的 `overflow-x: hidden` 改为 **`overflow-x: clip`**：
  `hidden` 会把外壳变成滚动容器，使页头的 `position: sticky` **失效**（实测 y 随滚动变负）；
  `clip` 同样裁掉横向溢出，但不创建滚动容器，吸顶因此生效。

**2026-09-24（首页借鉴 Cubit 的排版思路，先不换图）**

- 首屏改**居中排版**：新增 `.hero--centered`（标题居中、副标题居中、按钮居中），
  标题后**半句**改用强调色渐变 `.hero__title-em`（比主句小一档，主句仍是主角）。
- 新增**首屏卡片阵列** `.hero__cards`（桌面 5 列 / ≤1080 三列 / ≤900 两列 / ≤560 单列）：
  四类包装的紧凑卡 `.mini-card` + 一张 **Packy 卡** `.mini-card--packy`（浅实底 + 绿色状态徽标 + 深色主按钮）。
- 首屏大图从"右侧半幅"改为**卡阵列下方的通栏大图** `.hero__wide`，仍在首屏段落内、保留占位标注。
- 产品卡（`.format-card`）新增**角标** `.format-card__badge` 与**规格小字** `.card__spec`；
  原来的三条 tick 列表压成一行规格关键词（信息密度更高、卡片更干净）。
- 目的与边界：借鉴其"浅色、克制、信息前置"的做法；**未采用其任何图片素材**，配色仍用本站既有 token。

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
