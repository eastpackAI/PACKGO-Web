# app 目录说明与索引

**2026-09-24（页面摘要）**：`layout.tsx` 的全站默认标题与描述改为工作台与龙港制造入口定位，
对应首页新的客户说明；独立路由仍保留各自标题与可索引正文。

**2026-09-25（发布缺陷收口）**：全站 metadata（页面元信息）显式登记
`app/icon.svg`（Next.js 约定的应用图标入口），避免浏览器自动请求不存在的 `/favicon.ico`；
静态发布时图标地址必须沿用 `NEXT_PUBLIC_BASE_PATH`（公开子路径前缀），避免 GitHub Pages
把 `/icon.svg` 错指向站点根目录。图标只含公开品牌字母 P，不含客户资料或内部信息。

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录只保存 Next.js App Router（应用路由）的页面入口、全局布局与路由级元数据。

- 根路由 `/`：首页大厅与双视图入口。
- `solutions/`：行业解决方案的可深链路由，继续由双视图共用。
- `products/`：主要产品形态的可深链路由。
- `manufacturing/`、`platform/`、`about/`、`workspace/`：网站 2 内容拆分后的标准视图页面；空间视图仍复用主体验外壳。
- 全局样式只从 `app/globals.css` 汇入，具体变量与规则维护在 `styles/`。
- 不在路由文件里复制行业内容或页面状态，统一引用 `config/` 与共享体验组件。
