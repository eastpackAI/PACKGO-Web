# manufacturing 路由目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录负责 `/manufacturing`（真实制造与材料）独立页面的 URL 与页面元数据。

- 文案只来自 `config/standardHome.ts` 的 `manufacturing`，不做第二套事实。
- 正文由 `components/standard-view/StandardDetailView.tsx` 按路径渲染。
- 页面仍共用本站页头与双视图外壳，不引入网站 2 的独立总导航。

