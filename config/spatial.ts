import { getIndustryById, industries } from "@/config/industries";
import type {
  ConversationMessage,
  IndustryConfig,
  IndustryId,
  ManufacturingStageId,
  PackyDemoActionConfig,
  SpatialActionId,
  SpatialDetailId,
  SpatialFocus,
  SpatialFocusKind,
  SpatialMediaConfig,
  SpatialModuleConfig,
  SpatialSpace,
} from "@/lib/types";

/**
 * Spatial View 占位配置（Placeholder configuration）。
 *
 * 本文件只提供界面演示所需的占位内容：不声明任何真实产品参数、材料规格、工艺能力或产能事实。
 * 所有演示文本都带 `Placeholder` 说明，等正式内容核对后再替换。
 */

const PACKAGING_VISUALS: Record<IndustryId, { src: string; alt: string }> = {
  coffee: {
    src: "/placeholders/spatial-packaging/coffee-pouch.webp",
    alt: "明亮工业空间中的定制咖啡袋效果预览",
  },
  cosmetics: {
    src: "/placeholders/spatial-packaging/cosmetics-carton.webp",
    alt: "定制化妆品纸盒与陈列包装效果预览",
  },
  food: {
    src: "/placeholders/spatial-packaging/food-pouch.webp",
    alt: "定制食品袋与纸板包装效果预览",
  },
  "daily-care": {
    src: "/placeholders/spatial-packaging/daily-care-refill.webp",
    alt: "定制日化补充装与纸盒效果预览",
  },
};

const PACKGO_COLLECTION_VISUAL = {
  src: "/placeholders/spatial-packaging/packgo-packaging-collection.webp",
  alt: "PACKGO 定制包装系列效果预览",
};

export const platformFocus: SpatialFocus = {
  kind: "platform",
  id: "platform:packgo",
  eyebrow: "PACKGO · 空间视图",
  title: "让包装需求连接真实制造。",
  summary:
    "这里是你与 Packy 共同查看的唯一主焦点。点击左右模块，或让 Packy 带你查看，所有内容都会进入这个主窗口。",
  detail: "PACKGO 平台",
  placeholder: "占位：PACKGO 介绍影片、平台地图与已核实能力概览。",
  facts: [
    { label: "当前空间", value: "PACKGO 大厅" },
    { label: "共享焦点", value: "客户 + Packy" },
    { label: "内容状态", value: "当前为占位内容" },
  ],
  mediaId: "packgo-intro",
  mediaLabel: "PACKGO 介绍内容占位",
  imageSrc: PACKGO_COLLECTION_VISUAL.src,
  imageAlt: PACKGO_COLLECTION_VISUAL.alt,
};

export function getPlatformFocus(): SpatialFocus {
  return platformFocus;
}

export function solutionFocusId(industryId: IndustryId): string {
  return `solution:${industryId}`;
}

export function getSolutionFocus(industry: IndustryConfig): SpatialFocus {
  const visual = PACKAGING_VISUALS[industry.id];

  return {
    kind: "solution",
    id: solutionFocusId(industry.id),
    eyebrow: `${industry.shortTitle}展厅`,
    title: industry.title,
    summary: industry.overview,
    detail: `${industry.title}方案`,
    placeholder: `占位：${industry.placeholderAsset.subject}`,
    facts: [
      { label: "行业", value: industry.shortTitle },
      { label: "代表包装", value: industry.showcaseProducts.slice(0, 2).join(" · ") },
      { label: "核实资料", value: "尚未接入" },
    ],
    industryId: industry.id,
    imageSrc: visual.src,
    imageAlt: visual.alt,
  };
}

export function productFocusId(industryId: IndustryId, index: number): string {
  return `product:${industryId}:${index}`;
}

export function getProductFocus(industry: IndustryConfig, index = 0): SpatialFocus {
  const product = industry.showcaseProducts[index] ?? industry.showcaseProducts[0];
  const visual = PACKAGING_VISUALS[industry.id];

  return {
    kind: "product",
    id: productFocusId(industry.id, index),
    eyebrow: `${industry.shortTitle}展厅 · 产品`,
    title: product,
    summary:
      "代表性包装已经进入主焦点。无需离开当前内容，就可以继续查看结构、材料与生产工艺。",
    detail: product,
    placeholder: `占位：${product}结构视图、尺寸与样品照片。`,
    facts: [
      { label: "行业", value: industry.shortTitle },
      { label: "包装形态", value: product },
      { label: "规格参数", value: "等待核实内容" },
    ],
    industryId: industry.id,
    imageSrc: visual.src,
    imageAlt: visual.alt,
  };
}

export function getProductFocusById(
  productId: string | undefined,
  fallbackIndustry: IndustryConfig,
): SpatialFocus {
  if (!productId) return getProductFocus(fallbackIndustry);

  const [, industryId, indexPart] = productId.split(":");
  const industry = industries.find((item) => item.id === industryId) ?? fallbackIndustry;
  const index = Number.parseInt(indexPart ?? "0", 10);

  return getProductFocus(industry, Number.isNaN(index) ? 0 : index);
}

export function materialsFocusId(industryId: IndustryId): string {
  return `materials:${industryId}`;
}

export function getMaterialsFocus(industry: IndustryConfig): SpatialFocus {
  const visual = PACKAGING_VISUALS[industry.id];

  return {
    kind: "materials",
    id: materialsFocusId(industry.id),
    eyebrow: `${industry.shortTitle}展厅 · 材料`,
    title: `${industry.shortTitle}材料与结构`,
    summary:
      "材料与功能层继续留在同一共享焦点中，客户无需换页面，也不必重新说明需求。",
    detail: "材料层",
    placeholder: "占位：材料结构、阻隔选项与表面工艺样品。",
    facts: [
      { label: "行业", value: industry.shortTitle },
      { label: "内容层", value: "材料" },
      { label: "核实资料", value: "尚未接入" },
    ],
    industryId: industry.id,
    mediaId: `${industry.id}-materials`,
    mediaLabel: `${industry.shortTitle}材料样品占位`,
    imageSrc: visual.src,
    imageAlt: visual.alt,
  };
}

export function manufacturingFocusId(
  industryId: IndustryId,
  stage: ManufacturingStageId = "overview",
): string {
  return `manufacturing:${industryId}:${stage}`;
}

export function getManufacturingFocus(
  industry: IndustryConfig,
  stage: ManufacturingStageId = "overview",
): SpatialFocus {
  const isPrinting = stage === "printing";
  const visual = PACKAGING_VISUALS[industry.id];

  return {
    kind: isPrinting ? "printing" : "manufacturing",
    id: manufacturingFocusId(industry.id, stage),
    eyebrow: `${industry.shortTitle}展厅 · ${isPrinting ? "印刷与工艺" : "生产制造"}`,
    title: isPrinting ? "印刷与工艺" : "生产制造",
    summary: isPrinting
      ? "印刷与加工步骤作为同一包装方案的一部分进入共享焦点。"
      : "生产制造始终只需一步即可打开。正式资料核实后，这里可承载生产视频、设备与质量检查节点。",
    detail: isPrinting ? "印刷与工艺" : "生产制造",
    placeholder: "占位：生产画面、设备与检验节点。目前没有发布未经核实的制造信息。",
    facts: [
      { label: "行业", value: industry.shortTitle },
      { label: "当前阶段", value: isPrinting ? "印刷与工艺" : "生产制造" },
      { label: "核实资料", value: "尚未接入" },
    ],
    industryId: industry.id,
    mediaId: `${industry.id}-manufacturing-line`,
    mediaLabel: `${industry.shortTitle}生产画面占位`,
    imageSrc: visual.src,
    imageAlt: visual.alt,
  };
}

export function getCasesFocus(industry: IndustryConfig): SpatialFocus {
  return {
    kind: "cases",
    id: `cases:${industry.id}`,
    eyebrow: `${industry.shortTitle}展厅 · 案例`,
    title: `${industry.shortTitle}案例`,
    summary: "案例区域只用于经过核实并获得授权的客户故事，本阶段不会虚构任何案例。",
    detail: "案例",
    placeholder: "占位：已核实案例。目前没有发布客户案例、询价或真实项目。",
    facts: [
      { label: "行业", value: industry.shortTitle },
      { label: "案例", value: "待制作" },
      { label: "隐私要求", value: "需要核实授权" },
    ],
    industryId: industry.id,
    imageSrc: PACKAGING_VISUALS[industry.id].src,
    imageAlt: PACKAGING_VISUALS[industry.id].alt,
  };
}

export const workspaceFocus: SpatialFocus = {
  kind: "workspace",
  id: "workspace:entry",
  eyebrow: "PACKGO · 项目空间",
  title: "项目空间",
  summary:
    "这里预留未来的客户项目空间。当前模块只展示浏览上下文将如何衔接到项目。",
  detail: "项目空间入口",
  placeholder: "占位：项目入口与结构化需求交接。登录、询价和后台流程均未开放。",
  facts: [
    { label: "状态", value: "已预留" },
    { label: "登录", value: "尚未建设" },
    { label: "数据", value: "未存储客户数据" },
  ],
  imageSrc: PACKGO_COLLECTION_VISUAL.src,
  imageAlt: PACKGO_COLLECTION_VISUAL.alt,
};

export function getWorkspaceFocus(): SpatialFocus {
  return workspaceFocus;
}

/* ----------------------------- Context modules ----------------------------- */

export function getLobbyModules(industry: IndustryConfig): SpatialModuleConfig[] {
  const slot = { left: 0, right: 0 };
  const nextIndex = (side: "left" | "right") => slot[side]++;

  return [
    {
      id: solutionFocusId("coffee"),
      label: "咖啡包装",
      caption: getIndustryById("coffee").showcaseProducts[0],
      kind: "solution",
      side: "left",
      depth: "near",
      index: nextIndex("left"),
      action: "openShowroom",
      argument: "coffee",
      imageSrc: PACKAGING_VISUALS.coffee.src,
      imageAlt: PACKAGING_VISUALS.coffee.alt,
    },
    {
      id: solutionFocusId("cosmetics"),
      label: "化妆品包装",
      caption: getIndustryById("cosmetics").showcaseProducts[0],
      kind: "solution",
      side: "right",
      depth: "near",
      index: nextIndex("right"),
      action: "openShowroom",
      argument: "cosmetics",
      imageSrc: PACKAGING_VISUALS.cosmetics.src,
      imageAlt: PACKAGING_VISUALS.cosmetics.alt,
    },
    {
      id: solutionFocusId("food"),
      label: "食品包装",
      caption: getIndustryById("food").showcaseProducts[0],
      kind: "solution",
      side: "right",
      depth: "mid",
      index: nextIndex("right"),
      action: "openShowroom",
      argument: "food",
      imageSrc: PACKAGING_VISUALS.food.src,
      imageAlt: PACKAGING_VISUALS.food.alt,
    },
    {
      id: solutionFocusId("daily-care"),
      label: "日化包装",
      caption: getIndustryById("daily-care").showcaseProducts[0],
      kind: "solution",
      side: "left",
      depth: "mid",
      index: nextIndex("left"),
      action: "openShowroom",
      argument: "daily-care",
      imageSrc: PACKAGING_VISUALS["daily-care"].src,
      imageAlt: PACKAGING_VISUALS["daily-care"].alt,
    },
    {
      id: manufacturingFocusId(industry.id),
      label: "生产制造",
      caption: "工艺与生产过程",
      kind: "manufacturing",
      side: "left",
      depth: "far",
      index: nextIndex("left"),
      action: "showManufacturing",
      imageSrc: PACKGO_COLLECTION_VISUAL.src,
      imageAlt: PACKGO_COLLECTION_VISUAL.alt,
    },
    {
      id: materialsFocusId(industry.id),
      label: "材料",
      caption: "材料结构与功能",
      kind: "materials",
      side: "right",
      depth: "mid",
      index: nextIndex("right"),
      action: "showMaterials",
      imageSrc: PACKGO_COLLECTION_VISUAL.src,
      imageAlt: PACKGO_COLLECTION_VISUAL.alt,
    },
    {
      id: `cases:${industry.id}`,
      label: "案例",
      caption: "后续接入已核实案例",
      kind: "cases",
      side: "left",
      depth: "far",
      index: nextIndex("left"),
      action: "showCases",
      imageSrc: PACKGO_COLLECTION_VISUAL.src,
      imageAlt: PACKGO_COLLECTION_VISUAL.alt,
    },
    {
      id: workspaceFocus.id,
      label: "项目空间",
      caption: "未来项目入口",
      kind: "workspace",
      side: "right",
      depth: "far",
      index: nextIndex("right"),
      action: "openWorkspace",
      imageSrc: PACKGO_COLLECTION_VISUAL.src,
      imageAlt: PACKGO_COLLECTION_VISUAL.alt,
    },
  ];
}

export function getShowroomModules(industry: IndustryConfig): SpatialModuleConfig[] {
  const visual = PACKAGING_VISUALS[industry.id];

  return [
    {
      id: productFocusId(industry.id, 0),
      label: "产品",
      caption: industry.showcaseProducts[0],
      kind: "product",
      side: "left",
      depth: "near",
      index: 0,
      action: "openProduct",
      argument: productFocusId(industry.id, 0),
      imageSrc: visual.src,
      imageAlt: visual.alt,
    },
    {
      id: materialsFocusId(industry.id),
      label: "材料",
      caption: "阻隔与表面工艺",
      kind: "materials",
      side: "left",
      depth: "mid",
      index: 1,
      action: "showMaterials",
      imageSrc: visual.src,
      imageAlt: visual.alt,
    },
    {
      id: manufacturingFocusId(industry.id, "printing"),
      label: "印刷与工艺",
      caption: "印刷及加工阶段",
      kind: "printing",
      side: "right",
      depth: "mid",
      index: 0,
      action: "showManufacturing",
      argument: "printing",
      imageSrc: visual.src,
      imageAlt: visual.alt,
    },
    {
      id: manufacturingFocusId(industry.id),
      label: "生产制造",
      caption: "生产现场与能力",
      kind: "manufacturing",
      side: "right",
      depth: "far",
      index: 1,
      action: "showManufacturing",
      imageSrc: visual.src,
      imageAlt: visual.alt,
    },
  ];
}

/* --------------------------------- Media ---------------------------------- */

export const mediaLibrary: SpatialMediaConfig[] = [
  {
    id: "packgo-intro",
    label: "PACKGO 介绍影片",
    caption: "占位：平台介绍",
    owner: "platform",
  },
  {
    id: "manufacturing-line",
    label: "生产线画面",
    caption: "占位：生产视频",
    owner: "manufacturing",
  },
];

export function getMediaById(mediaId: string): SpatialMediaConfig | undefined {
  return mediaLibrary.find((item) => item.id === mediaId);
}

/* ----------------------------- Packy demo calls ---------------------------- */

export const packyDemoActions: PackyDemoActionConfig[] = [
  {
    id: "demo-open-coffee",
    label: "打开咖啡包装展厅",
    description: "与点击咖啡包装模块执行同一个操作。",
    action: "openShowroom",
    argument: "coffee",
    call: 'openShowroom("coffee")',
    showInPresence: true,
  },
  {
    id: "demo-open-lobby",
    label: "返回 PACKGO 大厅",
    description: "与点击返回大厅按钮执行同一个操作。",
    action: "openLobby",
    call: "openLobby()",
    showInPresence: true,
  },
  {
    id: "demo-materials",
    label: "查看材料",
    description: "把材料层调入主焦点。",
    action: "showMaterials",
    call: "showMaterials()",
    showInPresence: true,
  },
  {
    id: "demo-manufacturing",
    label: "查看生产制造",
    description: "把生产制造内容调入主焦点。",
    action: "showManufacturing",
    call: "showManufacturing()",
    showInPresence: true,
  },
  {
    id: "demo-media",
    label: "播放生产内容",
    description: "在主焦点中打开生产媒体占位内容。",
    action: "playMedia",
    argument: "manufacturing-line",
    call: 'playMedia("manufacturing-line")',
    showInPresence: true,
  },
  {
    id: "demo-product",
    label: "打开代表产品",
    description: "聚焦一个代表性包装产品。",
    action: "openProduct",
    argument: "product:coffee:0",
    call: 'openProduct("product:coffee:0")',
    showInPresence: false,
  },
  {
    id: "demo-cases",
    label: "打开案例",
    description: "显示预留的案例层。",
    action: "showCases",
    call: "showCases()",
    showInPresence: false,
  },
  {
    id: "demo-workspace",
    label: "打开项目空间入口",
    description: "显示预留的项目空间衔接位置。",
    action: "openWorkspace",
    call: "openWorkspace()",
    showInPresence: false,
  },
  {
    id: "demo-pin",
    label: "固定对话抽屉",
    description: "通过同一动作层固定右侧对话抽屉。",
    action: "pinConversation",
    call: "pinConversation()",
    showInPresence: false,
  },
  {
    id: "demo-back",
    label: "返回上一步",
    description: "返回上一个共享焦点。",
    action: "goBack",
    call: "goBack()",
    showInPresence: false,
  },
];

/* ------------------------------ Seed messages ----------------------------- */

export const packySeedMessages: ConversationMessage[] = [
  {
    id: "seed-packy",
    role: "packy",
    label: "Packy · 本地预览",
    body:
      "你正在看的，也是我正在看的。这里是占位界面，尚未接入 AI，因此我目前只会说明当前共享焦点。",
  },
  {
    id: "seed-system",
    role: "system",
    label: "本地原型",
    body:
      "当前为演示阶段：未接入 AI、后台、登录、询价或数据库。下方按钮只会调用本地页面操作。",
  },
];

/* -------------------------------- Utilities ------------------------------- */

export function spaceForFocusKind(kind: SpatialFocusKind): SpatialSpace {
  switch (kind) {
    case "platform":
      return "lobby";
    case "workspace":
      return "workspace";
    case "product":
      return "product";
    default:
      return "showroom";
  }
}

export function detailIdForFocusKind(kind: SpatialFocusKind): SpatialDetailId | null {
  switch (kind) {
    case "product":
    case "materials":
    case "printing":
    case "manufacturing":
      return kind;
    default:
      return null;
  }
}

export function describeActionCall(actionId: SpatialActionId, argument?: string): string {
  return argument ? `${actionId}("${argument}")` : `${actionId}()`;
}

export function spaceDisplayName(space: SpatialSpace): string {
  switch (space) {
    case "lobby":
      return "大厅";
    case "showroom":
      return "展厅";
    case "product":
      return "产品焦点";
    default:
      return "项目空间入口";
  }
}
