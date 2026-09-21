# PACKGO-Web 目录说明与索引

## 目录职责

本目录是 PACKGO 独立站的本地前端工程，负责公开网站的信息结构、双视图体验、页面组件、静态内容配置、
可访问性与本机构建验证。它是独立工程，不属于 `services/`，也不是 PACKGO Core（核心业务系统）或第二套业务事实源。

## 当前设计依据

1. 当前网站设计与 Packy AI 智能交互日常最高基线：`PACKGO 网站设计与 Packy AI 智能交互系统.md`。
2. 当前施工状态与验证记录：`PACKGO 网站搭建过程.md`。
3. `C2L_017`、`C2L_004` 等保留为详细历史依据与技术边界；与当前日常设计冲突时，以统一设计总纲和 Owner 最新确认决定为准。
4. 正式系统与安全边界冲突时以本机正式 Decision（正式决定）和 `AGENTS.md` 为准。
5. 上述云端源文件不复制进本工程；施工完成后只按规则向《PACKGO 网站搭建过程.md》追加记录。

## 首轮允许内容

- `app/`：Next.js App Router（应用路由）入口、首页与必要的解决方案路由骨架。
- `components/`：布局、大厅、Packy、标准视图与共享状态提供器。
- `config/`：行业、故事章节、标准旅程等静态占位配置。
- `lib/`：共享类型与轻量工具。
- `styles/`：设计变量、基础样式与组件样式。
- `public/placeholders/`：不含真实客户或生产数据的本地占位素材。
- 工程配置、说明文档与本地测试配置。

## 首轮禁止内容

- 真实后端接线、正式 AI API、数据库、登录、报价、RFQ（询价请求）或客户 Workspace（工作台）。
- 真实客户、工厂、供应商、订单、价格、案例或未经确认的制造能力数据。
- GitHub 外部托管、Hostinger、Staging（预发布环境）、Production（正式环境）或任何公网部署。
- Three.js、重型 WebGL、游戏引擎或与框架验证无关的大型依赖。
- Secret（秘密凭证）、Token（令牌）、API Key（接口密钥）、`.env` 或内部服务凭证。

## 当前索引

- `app/`：根页面、全局布局、Metadata（页面元数据）与 `/solutions/[slug]` 静态深链路由。
- `components/layout/`：`AppShell`、`SiteHeader`、`ViewModeSwitch` 与双视图统一体验入口。
- `components/providers/`：轻量共享状态、Shared Scene / Focus Context（共享场景 / 焦点上下文）与 Action Layer（动作层）。
- `components/lobby/`：Spatial View（空间视图）母版、Main Focus（主焦点）、Context Modules（上下文模块）、空间环境、行业快速导航与素材占位。
- `components/packy/`：主界面 Packy、Conversation Drawer（完整对话抽屉）及 Standard View 保留的辅助面板；当前均为本地占位交互，不调用 AI API。
- `components/standard-view/`：`StandardJourneyView`、五段内容与可点击 Journey Map（旅程导图）。
- `config/`：行业、主故事章节、标准旅程与 Spatial Scene（空间场景）的共享 Placeholder（占位）配置。
- `lib/`：页面状态、共享焦点、动作与内容配置的 TypeScript 类型和轻量工具。
- `styles/`：设计变量、基础规则、通用组件样式与独立 Spatial View 母版样式。
- `public/placeholders/`：后续公开占位素材入口；当前视觉占位由 CSS 与配置生成。
- `package.json` / `pnpm-lock.yaml`：固定版本的本地前端依赖与命令。
- `AGENTS.md`：保留 Next.js 开发服务器自动生成的兼容提示，并包含 PACKGO 页面设计持续记录、Agent 分工与额度控制规则；不含凭证。
- `CLAUDE.md`：Next.js 开发服务器自动生成的本版本 Agent（执行体）兼容提示；不含业务规则或凭证。

任何新增人工维护子目录都必须先在本 Guide 声明职责；`.next/`、`node_modules/` 等工具生成目录不纳入人工索引。

## 验收要求

至少通过 lint（静态检查）、typecheck（类型检查）与 production build（正式构建），并在本地浏览器验证首页、
双视图切换、专柜聚焦与返回、标准旅程跳转、Packy 展开收起及必要路由可访问。
