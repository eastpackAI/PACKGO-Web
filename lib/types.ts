export type ViewMode = "spatial" | "standard";

export type IndustryId = "coffee" | "cosmetics" | "food" | "daily-care";

export type LobbyState = "default" | "cabinet-focus" | "product-focus";

export type MainScreenChapter =
  | "intro"
  | "how-it-works"
  | "why-packgo"
  | "manufacturing-network"
  | "workspace";

export type PackyState = "open" | "collapsed";

export type JourneyStepId =
  | "solution"
  | "products"
  | "materials-features"
  | "process-manufacturing"
  | "cases-start-project";

export interface AssetPlaceholder {
  type: string;
  subject: string;
  pageLocation: string;
  suggestedContent: string[];
  status: "To Be Produced";
}

export interface IndustryConfig {
  id: IndustryId;
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  overview: string;
  showcaseProducts: string[];
  placeholderAsset: AssetPlaceholder;
  route: `/solutions/${string}`;
  accent: string;
}

export interface StoryChapterConfig {
  id: MainScreenChapter;
  label: string;
  title: string;
  summary: string;
  visualNote: string;
}

export interface JourneyStepConfig {
  id: JourneyStepId;
  number: string;
  label: string;
  title: string;
  description: string;
  placeholder: string;
}

/* ------------------------------------------------------------------ *
 * Spatial View shared model (Packy AI driven, local placeholder only).
 * 空间视图共享模型：只描述界面状态，不声明任何真实业务事实。
 * ------------------------------------------------------------------ */

/** Space the visitor is currently inside. 当前所在空间。 */
export type SpatialSpace = "lobby" | "showroom" | "product" | "workspace";

/** What the main focus currently holds. 主焦点当前承载的内容类型。 */
export type SpatialFocusKind =
  | "platform"
  | "solution"
  | "product"
  | "materials"
  | "printing"
  | "manufacturing"
  | "cases"
  | "workspace";

/** Detail layers that can be pulled into the main focus. 可进入主焦点的细分层。 */
export type SpatialDetailId = "product" | "materials" | "printing" | "manufacturing";

/** Illustrative production stage; placeholder content only. 演示用生产阶段，仅为占位。 */
export type ManufacturingStageId = "overview" | "printing";

export type SpatialDepth = "near" | "mid" | "far";
export type SpatialSide = "left" | "right";

/** Every interface change a customer can trigger. 客户可以触发的全部界面动作。 */
export type SpatialActionId =
  | "openLobby"
  | "openShowroom"
  | "openWorkspace"
  | "openProduct"
  | "showMaterials"
  | "showManufacturing"
  | "showCases"
  | "playMedia"
  | "goBack"
  | "openConversation"
  | "closeConversation"
  | "pinConversation";

export interface SpatialFocusFact {
  label: string;
  value: string;
}

/** The object the customer and Packy currently share. 客户与 Packy 共同关注的焦点对象。 */
export interface SpatialFocus {
  kind: SpatialFocusKind;
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  /** Short label used in status lines. 状态栏使用的短标签。 */
  detail: string;
  placeholder: string;
  facts: SpatialFocusFact[];
  industryId?: IndustryId;
  mediaId?: string;
  mediaLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
}

/** A weakened spatial module floating around the main focus. 主焦点周围的弱化空间模块。 */
export interface SpatialModuleConfig {
  id: string;
  label: string;
  caption: string;
  kind: SpatialFocusKind;
  side: SpatialSide;
  depth: SpatialDepth;
  index: number;
  action: SpatialActionId;
  argument?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface SpatialMediaConfig {
  id: string;
  label: string;
  caption: string;
  owner: "platform" | "manufacturing";
}

export type ConversationVisibility = "hidden" | "open";
export type ConversationRole = "packy" | "system" | "customer";

export interface ConversationMessage {
  id: string;
  role: ConversationRole;
  label: string;
  body: string;
}

/** A local demo shortcut proving Packy calls the shared Action Layer. Packy 本地演示快捷动作。 */
export interface PackyDemoActionConfig {
  id: string;
  label: string;
  description: string;
  action: SpatialActionId;
  argument?: string;
  /** Human readable call, e.g. openShowroom("coffee"). 可读的动作调用文本。 */
  call: string;
  showInPresence: boolean;
}
