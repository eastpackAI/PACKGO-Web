# components 目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录保存未来会独立变化的 React 页面组件。

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
