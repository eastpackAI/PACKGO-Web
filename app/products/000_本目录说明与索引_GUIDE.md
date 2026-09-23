# products 路由目录说明与索引

本目录承载「主要包装形态」的独立页面路由（正常 URL，可被搜索引擎抓取）。

- `[slug]/`：四种主要包装形态（`flexible` / `carton` / `label` / `bags`）的可深链页面。
- 路由只负责 URL、静态参数与页面元数据；正文由标准视图的独立页面组件按路径渲染。
- 页面内容只来自 `config/standardHome.ts`（`formats` / `productRoutes`），不在这里复制业务文案或第二套事实。

