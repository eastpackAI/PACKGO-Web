# providers 组件目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

**2026-09-23｜ExperienceProvider：Packy 面板"换页就消失"修复**

`CONVERSATION_STORAGE_KEY`（sessionStorage）原只持久化 `pinned`；换页时 `PackgoExperience`
会重新挂载 Provider，于是**打开着的 Packy 面板会被重置为隐藏**（Owner 反馈"点出来之后
点别的地方（含点导航）它就自动隐藏"）。

现在同时持久化并恢复 `open`：`{ messages, draft, pinned, open }`，
恢复时 `parsed.pinned → setConversationPinned(true)`、`parsed.pinned || parsed.open → 打开`
（两者语义分开，不把"打开着"误标成"已固定"）。

保存轻量 React Context（上下文）状态提供器、Shared Scene / Focus Context（共享场景 / 焦点上下文）、共享 Conversation State（对话状态）与页面 Action Layer（动作层）。不引入第三方状态管理框架；视图模式偏好仅保存在浏览器本地，不接正式 AI 或业务事实。
