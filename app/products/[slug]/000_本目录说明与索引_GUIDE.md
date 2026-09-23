# [slug] 路由目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录负责 `/products/<id>` 四个产品形态页面的 URL、静态参数与页面元数据。

- 静态参数来自 `config/standardHome.ts` 的 `productRoutes`（`flexible` / `carton` / `label` / `bags`）。
- 未列出的 slug 直接 404（`dynamicParams = false`），不会生成空白页。
- 页面仍渲染同一个 PACKGO App Shell（应用外壳）；标准视图正文由
  `components/standard-view/StandardDetailView.tsx` 按路径渲染，不在此文件里写正文。

