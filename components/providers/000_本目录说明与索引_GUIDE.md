# providers 组件目录说明与索引

**2026-09-23｜ExperienceProvider：Packy 面板"换页就消失"修复**

`CONVERSATION_STORAGE_KEY`（sessionStorage）原只持久化 `pinned`；换页时 `PackgoExperience`
会重新挂载 Provider，于是**打开着的 Packy 面板会被重置为隐藏**（Owner 反馈"点出来之后
点别的地方（含点导航）它就自动隐藏"）。

现在同时持久化并恢复 `open`：`{ messages, draft, pinned, open }`，
恢复时 `parsed.pinned → setConversationPinned(true)`、`parsed.pinned || parsed.open → 打开`
（两者语义分开，不把"打开着"误标成"已固定"）。

保存轻量 React Context（上下文）状态提供器、Shared Scene / Focus Context（共享场景 / 焦点上下文）、共享 Conversation State（对话状态）与页面 Action Layer（动作层）。不引入第三方状态管理框架；视图模式偏好仅保存在浏览器本地，不接正式 AI 或业务事实。
