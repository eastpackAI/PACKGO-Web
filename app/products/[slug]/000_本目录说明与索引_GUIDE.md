# [slug] 路由目录说明与索引

本目录负责 `/products/<id>` 四个产品形态页面的 URL、静态参数与页面元数据。

- 静态参数来自 `config/standardHome.ts` 的 `productRoutes`（`flexible` / `carton` / `label` / `bags`）。
- 未列出的 slug 直接 404（`dynamicParams = false`），不会生成空白页。
- 页面仍渲染同一个 PACKGO App Shell（应用外壳）；标准视图正文由
  `components/standard-view/StandardDetailView.tsx` 按路径渲染，不在此文件里写正文。

