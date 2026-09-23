# workspace 路由目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录负责 `/workspace`（Packy 工作台）独立页面的 URL 与页面元数据。

- 工作台正文直接复用 `components/standard-view/home/WorkbenchSection.tsx`
  （`showWorkspaceLink={false}`，避免页面自我链接），不复制第二套工作台。
- 文案只来自 `config/standardHome.ts` 的 `workbench` 与 `demoBoundary`。
- 仍是浏览器本地演示：内容只写 `localStorage`，不落库、不接后端、不构成正式报价。
- 空间视图侧的「打开工作台」由共享 Action Layer 负责，本路由只保证标准视图有正常网页入口。

