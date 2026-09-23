# packy 组件目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

保存 Packy Packaging Assistant（包装助手）界面层：Spatial View 的主界面 Packy、可自动隐藏 / 固定的 Conversation Drawer（完整对话抽屉），以及 Standard View 暂时保留的辅助面板。两处对话界面共享同一 Session / Draft / Message Thread / Context；当前只做本地占位交互，不调用 AI API。

`StandardPackyBridge.tsx` 接收标准视图首页与本地工作台的打开、提问、备注事件，并写入同一个 ExperienceProvider 对话；不得复制网站 2 的独立脚本回复或第二套会话。
