# layout 组件目录说明与索引

**2026-09-23｜AppShell：为 Packy 面板让位**

`AppShell` 现在读 `conversationVisibility`，在根节点加 `conversation-open` 类；
配合 `styles/components.css` 的 `.app-shell.conversation-open .app-body{padding-right:…}`，
Packy 完整对话打开时页面**让出右侧一条**，用户仍能点页面上的其它内容
（Owner 反馈"点出来之后点不到别的地方"）。

保存 App Shell（应用外壳）、Site Header（站点页头）与 View Mode Switch（视图切换）组件。
