# home 目录说明与索引（标准视图首页栏目）

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录保存标准视图首页的栏目组件：内容全部来自 `config/standardHome.ts`，
样式全部限制在 `.standard-home` 作用域内（`styles/standard-home.css`）。
它承接 `PACKGO-Web-2`（网站 2）最新首页的视觉与栏目节奏，但**不**承接网站 2 的总导航与独立聊天会话。

## 文件职责

- `Section.tsx`：统一版块容器（眉标 + 标题 + 说明 + 内容）；可选 `action`（版块右上角的站内跳转链接）。
- `Hero.tsx`：首屏先用主标题、短说明和三项快读内容回答工作台是什么、怎样对接、客户得到什么；
  Packy 仍是共享会话入口，产品形态卡由后续 `FormatGrid.tsx` 承载。
  **原来首屏那张静态占位照片已由 `HeroStory.tsx` 取代**（照片本身仍作为动画里"客户带来的照片"卡片使用）。
- `HeroStory.tsx`：**首屏动画**（2026-09-25，AT-000088）——五拍讲清网站逻辑：
  ① 想法 / 照片 / 样品进入工作台 ② 工作台整理成需求、方案与报价 ③ 规格发给中国印刷城龙港的工厂车间
  ④ 车间按工序排产（印刷 → 复合 → 制袋 → 质检）⑤ 工期与工序证据回到工作台、客户在同一处看到进度。
  SVG 绘制 + 定时器驱动；进入视口自动播一遍，**播完即停、不循环**，可点"再看一遍"；
  `prefers-reduced-motion` 下直接给最终状态。文案与拍点只在 `config/standardHome.ts` 的 `heroStory` 里改。
- `FormatGrid.tsx`：四大产品形态卡 + 三项能力条；每张卡用 `next/link` 指向 `productRoutes` 对应页面。
- `PackySection.tsx`：Packy 专区；对话示例只作静态示意，真正的对话入口统一走 `StandardPackyControls`。
- `WorkbenchSection.tsx`：浏览器本地工作台演示（登记 / 项目 / 询价记录 / 图稿 / 问 Packy）。
  顶部固定展示 `demoBoundary` 边界说明；数据只写 `localStorage`，不落库、不调用外部接口。
  首页通过 `showWorkspaceLink` 指向 `/workspace`；`/workspace` 页面可直接复用同一组件（关闭该链接即可）。
- `StandardPackyControls.tsx`：标准视图唯一的 Packy 入口。只派发浏览器事件
  `packy:open` / `packy:ask` / `packy:note`，由共享 `ExperienceProvider` 侧接桥，**不新建第二套会话**。
- `ManufacturingSection.tsx` / `PlatformSection.tsx` / `AboutSection.tsx`：对应栏目 + 指向
  `/manufacturing`、`/platform`、`/about` 的版块入口。
- `WorkbenchFlow.tsx`：**工作台六步滚动段落**（2026-09-25，AT-000087）。左边一屏 `position: sticky`
  钉住，右边六步随滚动逐步点亮；桌面钉住、窄屏（≤900px）退回普通纵向列表。
  当前步骤以视口中线为锚，选择中心距离最近的一步，快速滑动也不会复用已经离开的旧步骤。
  内容来自 `config/standardHome.ts` 的 `workbenchFlow`；步骤口径（费用分列、工期含预留、
  工序证据经确认才成为可见进度）来自蓝图，改文案只改配置。
- `ScrollReveal.tsx`：**逐条浮现**。给元素标 `data-reveal`（可配 `--reveal-delay`）即可，
  进视口后加 `.is-revealed`，过渡写在 `styles/standard-home.css` 的 `.js-reveal` 作用域里；
  脚本没跑起来时不隐藏内容，`prefers-reduced-motion` 下直接显示。全首页只挂一次。
- `IndustrySolutions.tsx`：行业展厅卡（`next/link` → `/solutions/<id>-packaging`）+ 通用包装展厅说明块。
  卡片带 `data-reveal`，交错浮现（从这些卡片起进入「滚动动效」区，首屏不动）。
- `CategoryGrid.tsx`：产品品类网格；有对应产品页的品类渲染为链接，没有对应页面的保持纯文本。
- `Footer.tsx`：页脚；链接文案能对应到站内页面时才渲染为 `next/link`，其余保持纯文本。

## 约束

1. 首页是**总览**：不允许出现「看着能点、其实没有链接」的卡片或箭头。
2. 文案只在 `config/standardHome.ts` 里改，组件不散写业务口径。
3. 不新增价格、产线、交期等未经确认的承诺；演示内容必须带准确标注。
4. 不引入网站 2 的 `Header`、`nav` 或 `PackyDrawer` 独立会话。
