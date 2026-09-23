# packy 组件目录说明与索引

保存 Packy Packaging Assistant（包装助手）界面层：Spatial View 的主界面 Packy、可自动隐藏 / 固定的 Conversation Drawer（完整对话抽屉），以及 Standard View 暂时保留的辅助面板。两处对话界面共享同一 Session / Draft / Message Thread / Context；当前只做本地占位交互，不调用 AI API。

`StandardPackyBridge.tsx` 接收标准视图首页与本地工作台的打开、提问、备注事件，并写入同一个 ExperienceProvider 对话；不得复制网站 2 的独立脚本回复或第二套会话。
