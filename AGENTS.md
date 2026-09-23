<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## PACKGO 页面设计持续记录规则

任何涉及以下内容的任务：

- 页面布局
- 页面风格
- 配色
- 字体
- 尺寸
- 间距
- 首页主屏
- 行业专柜
- Packy
- Spatial View（空间视图）
- Standard View（标准视图）
- 动画
- 页面视觉层级
- 页面交互
- 任何最终会改变用户看到或操作方式的前端修改

开始施工前必须：

1. 读取统一设计总纲：
   `/Users/zaiyanmiu/Library/CloudStorage/GoogleDrive-eastpacksolutions@gmail.com/我的云端硬盘/工作资料/AI Cloud Workspace/010_跨系统交互中心_CROSS_SYSTEM_INTERACTION_CENTER/050_交互_INTERACTION/001_建站线_独立站/PACKGO 网站设计与 Packy AI 智能交互系统.md`
2. 读取持续施工记录：
   `/Users/zaiyanmiu/Library/CloudStorage/GoogleDrive-eastpacksolutions@gmail.com/我的云端硬盘/工作资料/AI Cloud Workspace/010_跨系统交互中心_CROSS_SYSTEM_INTERACTION_CENTER/050_交互_INTERACTION/001_建站线_独立站/PACKGO 网站搭建过程.md`
3. 重点确认当前有效设计原则、最近施工状态、已替代方向与 Owner 审核状态。
4. 如任务涉及更详细的页面、业务或技术边界，再按需读取 `C2L_017` 等历史依据的相关章节，不需要每次全文重复读取。

施工完成并验证后必须：

1. 自动追加一条记录到《PACKGO 网站搭建过程.md》；
2. 不等待 Owner 额外要求；
3. 不覆盖历史记录；
4. 记录必须精简、准确；
5. 如果本次修改改变了已经确认的正式设计原则，必须先停止相关施工并报告 Owner；Owner 确认后才可同步更新《PACKGO 网站设计与 Packy AI 智能交互系统.md》；
6. 如果只是内部代码重构、lint（静态检查）、拼写修复，且最终页面没有任何视觉或交互变化，则无需记录。

记录格式统一：

```text
### YYYY-MM-DD｜修改主题

- 调整：实际改变了什么。
- 保留：哪些相关设计保持不变。
- 验证：页面 / build 状态。
```

如果只是非常小的视觉调整，可以缩短为：

```text
### YYYY-MM-DD｜修改主题

- 调整：xxx。
```

严禁：

- 写成长篇开发日志；
- 记录大量代码细节；
- 覆盖旧设计过程；
- 每次修改创建新的设计文件；
- 修改后忘记更新《PACKGO 网站搭建过程.md》；
- 把设计原则与施工留痕重新混写到同一份文件。

## PACKGO 建站 Agent 分工与额度控制规则

为避免主 Agent 承担全部施工而过快消耗上下文与额度，PACKGO-Web 后续中大型建站任务默认采用“主 Agent 统筹、子 Agent 施工、主 Agent 独立验收”的工作方式。

### 主 Agent 职责

- 读取并判断设计基线、产品边界与当前工程状态；
- 拆分任务、确定依赖关系和唯一写入范围；
- 向子 Agent 提供目标、允许修改范围、禁止事项、验收标准、证据要求与停止线；
- 统一接线、回读实际变更并复跑必要检查；
- 对最终结果负责，并更新《PACKGO 网站搭建过程.md》及向 Owner 返回施工结果；设计原则发生变化时按 Owner 决定同步统一设计总纲。

### 子 Agent 职责

- 承担边界明确的组件、样式、页面实现或独立检查任务；
- 只修改任务包允许的文件，不扩大产品范围；
- 集中返回摘要、修改文件、测试证据和风险，不持续倾倒长日志；
- 子 Agent 的完成报告不等于主 Agent 验收通过。

### 分派原则

- 涉及多个组件、较大布局调整、广泛样式修改、动画、路由或可独立测试的任务，优先调用子 Agent；
- 单处文案、极小样式调整或无法安全拆分的任务，可由主 Agent 直接完成；
- 同一文件同一时刻只能有一个写入者；并行任务不得重叠写入；
- 主 Agent 应使用最少且必要的子 Agent，避免重复读取和无效分派；
- 如果 Owner 明确要求不调用子 Agent，或任务存在不可拆分的共享写入，则由主 Agent 串行执行；
- 不得为了节省额度降低设计核对、测试、独立验收或设计记录要求。

## 对外快照机制（交给云端 AI 时）

云端 AI（ChatGPT 窗口等）读不到本机目录。要把本工程或整个工作区的现状交给它时，
先跑 `./tools/aiw-snapshot` 生成「系统快照」（写入老区 `050_交互_INTERACTION/007_云地交互与信箱/`，
占 `L2C_` 全局流水号，不覆盖旧快照），把最新那份给它即可。机制正本在交互中心
`…/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本 `docs/system-snapshot-mechanism.md`；
各级 Guide 的指针说明由 `./tools/check-guides` 强制校验。快照不是事实源，
**不放密钥、客户隐私与真实价格**。
