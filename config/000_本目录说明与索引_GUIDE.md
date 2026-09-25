# config 目录说明与索引

**2026-09-24（首屏信息定位）**：`standardHome.ts` 的 `brand` 统一提供工作台定位、
客户如何通过 Packy 与 PACKGO 开始、三项可快速扫读的客户价值，以及独立页面共用的简短定位句。
产品清单继续由既有 `formats` 与行业配置提供，不再作为首页第一句话。

**2026-09-24（首页首屏重组的内容侧改动）**

- `standardHome.ts` 的 `brand` 新增 **`supportShort`**：一句话副标题，专供首屏使用
  （原来那段更长的 `support` 仍供其它区块引用）。
- `formats` 每一项新增 **`badge`**（主推 / 结构先定 / 按贴附面确认 / 成套交付）：
  产品卡角标，只写我们能兑现的事实，不写夸大词。

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录保存可被 Spatial View（空间浏览）与 Standard View（标准浏览）共同读取的静态内容配置，以及 Lobby / Showroom 的场景、主焦点和上下文模块 Placeholder（占位）配置。
只允许行业、主故事章节、旅程步骤、空间场景与明确标注的 Placeholder 内容；不得写入未经确认的真实业务事实。
