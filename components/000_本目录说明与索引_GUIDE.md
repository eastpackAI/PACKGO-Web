# components 目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录保存未来会独立变化的 React 页面组件。

**2026-09-24（右下角 Packy 常驻入口）**：新增 `packy/PackyLauncher.tsx`，由 `layout/AppShell.tsx`
渲染。要求来自 Owner：右下角要有像 Cubit "Chat with Cubit" 那样**常驻**的 Packy 入口。
三条约束写在该组件注释里：① 打开的是**同一个**共享 Packy 会话（`openConversation`）；
② 完整对话打开/固定时自动隐藏（`.is-open` 只改变透明度与可点性，不做卸载，避免布局跳动）；
③ 带 `data-packy-keep-open`，不被"点面板外即收起"误关。空间视图由 CSS 隐去（那边已有 `PackyPresence`）。

**2026-09-24（首页首屏重组：借 Cubit 的排版，不借它的素材）**

- `standard-view/home/Hero.tsx`：首屏改为**居中排版**（标题拆两段、只有后半句用强调色）；
  副标题改用一句话的 `brand.supportShort`；CTA 两个（"和 Packy 聊聊"走共享会话、
  "看看我们能做什么"锚到形态区）。**新增首屏卡片阵列**：四类包装的紧凑卡 +
  一张 **Packy 卡**（带 `data-packy-keep-open`，点它不会把刚打开的抽屉误关）。
  首屏大图移到位居卡阵列下方的通栏位置。
- `standard-view/home/FormatGrid.tsx`：产品卡加**角标**、把三条 tick 列表压成**一行规格小字**，
  卡片更紧凑（对齐 Cubit 产品卡的信息密度），链接与路由未变。

**2026-09-23（页头主导航对齐网站 2）**：`layout/SiteHeader.tsx` 的导航由 3 项扩为 **6 项**
（解决方案 / 产品品类 / Packy 工作台 / 材料与工艺 / 为什么选我们 / 关于 PACKGO），
并在右上角补齐网站 2 页头的 **信任语「真实工厂直连 · 从设计到量产」** 与
**「和 Packy 聊聊」按钮**（走 `PackyOpenButton` → 共享会话，不新开第二套对话）。
导航目标全部指向**主站自己的路由/锚点**：`/#solutions`、`/#categories` 回首页对应章节，
`/workspace`、`/manufacturing`、`/platform`、`/about` 是主站既有独立页面。
空间视图仍是**导航视觉降级**（只留品牌 / 视图切换 / 登录），此约定未改。

- `layout/`：App Shell（应用外壳）、页头与视图切换。
- `lobby/`：空间大厅、主故事屏、行业专柜与快速导航。
- `packy/`：Packy 侧栏骨架。
- `standard-view/`：标准浏览与纵向 Journey Map（旅程导图）。
- `providers/`：共享页面状态与浏览模式偏好。

组件只读取统一配置与共享状态，不拥有第二套行业内容。
