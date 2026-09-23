# home 目录说明与索引（标准视图首页栏目）

本目录保存标准视图首页的栏目组件：内容全部来自 `config/standardHome.ts`，
样式全部限制在 `.standard-home` 作用域内（`styles/standard-home.css`）。
它承接 `PACKGO-Web-2`（网站 2）最新首页的视觉与栏目节奏，但**不**承接网站 2 的总导航与独立聊天会话。

## 文件职责

- `Section.tsx`：统一版块容器（眉标 + 标题 + 说明 + 内容）；可选 `action`（版块右上角的站内跳转链接）。
- `Hero.tsx`：首屏（主标题、双入口、能力条）。主入口用 Packy 共享会话，副入口指向首页行业展厅栏。
- `FormatGrid.tsx`：四大产品形态卡 + 三项能力条；每张卡用 `next/link` 指向 `productRoutes` 对应页面。
- `PackySection.tsx`：Packy 专区；对话示例只作静态示意，真正的对话入口统一走 `StandardPackyControls`。
- `WorkbenchSection.tsx`：浏览器本地工作台演示（登记 / 项目 / 询价记录 / 图稿 / 问 Packy）。
  顶部固定展示 `demoBoundary` 边界说明；数据只写 `localStorage`，不落库、不调用外部接口。
  首页通过 `showWorkspaceLink` 指向 `/workspace`；`/workspace` 页面可直接复用同一组件（关闭该链接即可）。
- `StandardPackyControls.tsx`：标准视图唯一的 Packy 入口。只派发浏览器事件
  `packy:open` / `packy:ask` / `packy:note`，由共享 `ExperienceProvider` 侧接桥，**不新建第二套会话**。
- `ManufacturingSection.tsx` / `PlatformSection.tsx` / `AboutSection.tsx`：对应栏目 + 指向
  `/manufacturing`、`/platform`、`/about` 的版块入口。
- `IndustrySolutions.tsx`：行业展厅卡（`next/link` → `/solutions/<id>-packaging`）+ 通用包装展厅说明块。
- `CategoryGrid.tsx`：产品品类网格；有对应产品页的品类渲染为链接，没有对应页面的保持纯文本。
- `Footer.tsx`：页脚；链接文案能对应到站内页面时才渲染为 `next/link`，其余保持纯文本。

## 约束

1. 首页是**总览**：不允许出现「看着能点、其实没有链接」的卡片或箭头。
2. 文案只在 `config/standardHome.ts` 里改，组件不散写业务口径。
3. 不新增价格、产线、交期等未经确认的承诺；演示内容必须带准确标注。
4. 不引入网站 2 的 `Header`、`nav` 或 `PackyDrawer` 独立会话。
