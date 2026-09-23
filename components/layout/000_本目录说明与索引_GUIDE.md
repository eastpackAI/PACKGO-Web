# layout 组件目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

**2026-09-23｜AppShell：为 Packy 面板让位**

`AppShell` 现在读 `conversationVisibility`，在根节点加 `conversation-open` 类；
配合 `styles/components.css` 的 `.app-shell.conversation-open .app-body{padding-right:…}`，
Packy 完整对话打开时页面**让出右侧一条**，用户仍能点页面上的其它内容
（Owner 反馈"点出来之后点不到别的地方"）。

保存 App Shell（应用外壳）、Site Header（站点页头）与 View Mode Switch（视图切换）组件。
