# products 路由目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录承载「主要包装形态」的独立页面路由（正常 URL，可被搜索引擎抓取）。

- `[slug]/`：四种主要包装形态（`flexible` / `carton` / `label` / `bags`）的可深链页面。
- 路由只负责 URL、静态参数与页面元数据；正文由标准视图的独立页面组件按路径渲染。
- 页面内容只来自 `config/standardHome.ts`（`formats` / `productRoutes`），不在这里复制业务文案或第二套事实。

