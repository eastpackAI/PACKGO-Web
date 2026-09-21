import type { IndustryConfig, IndustryId } from "@/lib/types";

export type LobbyWall = "left" | "right" | "far";

/**
 * Spatial View (Lobby) placement only.
 * The industrial accent here is used inside the lobby hall; `IndustryConfig.accent`
 * stays untouched so Standard View keeps its current palette.
 */
export interface IndustryLobbyPlacement {
  wall: LobbyWall;
  /** 0 = closest to the visitor at the lobby entrance, higher = deeper in the hall. */
  depth: number;
  accent: string;
  /** Sample silhouettes standing inside the showcase case. */
  display: "pouch" | "carton" | "rigid";
  /** Short spatial caption for the hall, e.g. "Coffee Showroom". */
  spaceLabel: string;
}

export const industryLobbyPlacements: Record<IndustryId, IndustryLobbyPlacement> = {
  coffee: {
    wall: "left",
    depth: 0,
    accent: "#b8763a",
    display: "pouch",
    spaceLabel: "咖啡包装展厅",
  },
  cosmetics: {
    wall: "right",
    depth: 0,
    accent: "#1f4f8f",
    display: "carton",
    spaceLabel: "化妆品包装展厅",
  },
  "daily-care": {
    wall: "left",
    depth: 1,
    accent: "#4a7fa5",
    display: "rigid",
    spaceLabel: "日化包装展厅",
  },
  food: {
    wall: "far",
    depth: 2,
    accent: "#2f6f9f",
    display: "pouch",
    spaceLabel: "食品包装展厅",
  },
};

export function getIndustryLobbyPlacement(id: IndustryId): IndustryLobbyPlacement {
  return industryLobbyPlacements[id];
}

export const industries: IndustryConfig[] = [
  {
    id: "coffee",
    slug: "coffee-packaging",
    title: "咖啡包装",
    shortTitle: "咖啡包装",
    shortDescription: "面向烘焙咖啡、零售陈列与品牌表达的软包装方案。",
    overview: "从成品袋出发，逐步了解包装结构、材料、工艺与生产制造。",
    showcaseProducts: ["平底咖啡袋", "自立袋", "带阀咖啡袋"],
    placeholderAsset: {
      type: "产品与生产视觉",
      subject: "咖啡包装 / 平底咖啡袋",
      pageLocation: "大厅 / 咖啡包装展柜",
      suggestedContent: ["成品袋正面与侧面", "单向排气阀细节", "制袋设备与成品细节"],
      status: "To Be Produced",
    },
    route: "/solutions/coffee-packaging",
    accent: "#f99c00",
  },
  {
    id: "cosmetics",
    slug: "cosmetics-packaging",
    title: "化妆品包装",
    shortTitle: "化妆品包装",
    shortDescription: "涵盖纸盒、标签、软包装与陈列细节的高品质包装方向。",
    overview: "围绕包装结构、表面工艺、货架呈现与生产验证展开的浏览路径。",
    showcaseProducts: ["折叠纸盒", "精品标签", "陈列包装"],
    placeholderAsset: {
      type: "产品陈列视觉",
      subject: "化妆品包装 / 折叠纸盒",
      pageLocation: "大厅 / 化妆品包装展柜",
      suggestedContent: ["纸盒结构与层次", "烫金与局部 UV 工艺", "陈列灯光与表面效果"],
      status: "To Be Produced",
    },
    route: "/solutions/cosmetics-packaging",
    accent: "#7862f3",
  },
  {
    id: "food",
    slug: "food-packaging",
    title: "食品包装",
    shortTitle: "食品包装",
    shortDescription: "围绕食品保护、货架信息与生产选择的包装方案入口。",
    overview: "当前为内容占位版本，后续将补充经过核实的食品包装能力。",
    showcaseProducts: ["食品袋占位", "卷膜占位"],
    placeholderAsset: {
      type: "行业方案视觉",
      subject: "食品包装",
      pageLocation: "行业方案页面占位",
      suggestedContent: ["代表性成品包装", "阻隔材料", "包装生产工艺"],
      status: "To Be Produced",
    },
    route: "/solutions/food-packaging",
    accent: "#3ae695",
  },
  {
    id: "daily-care",
    slug: "daily-care-packaging",
    title: "日化包装",
    shortTitle: "日化包装",
    shortDescription: "面向日化包装形态与功能需求的方案入口。",
    overview: "当前用于验证共享内容与正常网址结构，不代表展厅内容已经完成。",
    showcaseProducts: ["补充装包装占位", "标签占位"],
    placeholderAsset: {
      type: "行业方案视觉",
      subject: "日化包装",
      pageLocation: "行业方案页面占位",
      suggestedContent: ["补充装包装示例", "标签系统", "耐用与密封测试"],
      status: "To Be Produced",
    },
    route: "/solutions/daily-care-packaging",
    accent: "#3080ff",
  },
];

export const featuredIndustryIds: IndustryId[] = ["coffee", "cosmetics"];

export function getIndustryById(id: IndustryId): IndustryConfig {
  return industries.find((industry) => industry.id === id) ?? industries[0];
}

export function getIndustryBySlug(slug: string): IndustryConfig | undefined {
  return industries.find((industry) => industry.slug === slug);
}
