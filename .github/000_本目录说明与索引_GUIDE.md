# .github/｜本目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

GitHub 平台配置目录（工具自动读取，不需要本地运行）。

| 路径 | 用途 |
|---|---|
| `workflows/deploy-pages.yml` | **预览通道**：向 `develop` 分支推送时，自动 lint → typecheck → 静态导出 → 发布到 GitHub Pages，产出固定公网预览网址 |

规则：

1. 本目录只放 GitHub 平台配置，不放业务代码；
2. 修改 workflow 等于修改发布通道，改完要看 Actions 页面的运行结果；
3. 这里不放任何密钥——需要密钥时用 GitHub 仓库的 Secrets，不要写进文件。
