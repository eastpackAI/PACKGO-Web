"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getIndustryById } from "@/config/industries";
import {
  describeActionCall,
  detailIdForFocusKind,
  getCasesFocus,
  getManufacturingFocus,
  getMaterialsFocus,
  getMediaById,
  getPlatformFocus,
  getProductFocusById,
  getSolutionFocus,
  getWorkspaceFocus,
  packySeedMessages,
  spaceForFocusKind,
} from "@/config/spatial";
import type {
  ConversationMessage,
  ConversationVisibility,
  IndustryId,
  JourneyStepId,
  LobbyState,
  MainScreenChapter,
  ManufacturingStageId,
  PackyState,
  SpatialActionId,
  SpatialDetailId,
  SpatialFocus,
  SpatialSpace,
  ViewMode,
} from "@/lib/types";

const VIEW_MODE_STORAGE_KEY = "packgo:view-mode";
const CONVERSATION_STORAGE_KEY = "packgo:packy-session";

let messageSequence = 0;

function nextMessageId(): string {
  messageSequence += 1;
  return `local-message-${messageSequence}`;
}

function normalizeStoredMessage(message: ConversationMessage): ConversationMessage {
  if (message.role === "customer") return message;

  if (message.body.startsWith("Packy called ")) {
    return {
      ...message,
      label: "Packy · 本地演示操作",
      body: "Packy 已通过与手动点击相同的动作层完成页面操作。本次没有调用 AI。",
    };
  }

  if (message.body.startsWith("Stored in this browser session only.")) {
    return {
      ...message,
      label: "本地原型",
      body: "内容仅保存在当前浏览器会话中。没有调用 AI，也不会自动生成回复。",
    };
  }

  if (message.body.startsWith("Everything you focus, I focus.")) {
    return packySeedMessages[0];
  }

  if (message.body.startsWith("Demo milestone:")) {
    return packySeedMessages[1];
  }

  return message;
}

/** Legacy page prop → spatial space. 旧路由参数 → 空间。 */
function lobbyStateToSpace(state: LobbyState): SpatialSpace {
  if (state === "cabinet-focus") return "showroom";
  if (state === "product-focus") return "product";
  return "lobby";
}

function buildSpaceFocus(space: SpatialSpace, industryId: IndustryId): SpatialFocus {
  if (space === "lobby") return getPlatformFocus();
  if (space === "workspace") return getWorkspaceFocus();
  return getSolutionFocus(getIndustryById(industryId));
}

/** Direct URLs describe the same focus in both views. */
function focusForRoute(
  pathname: string,
  industryId: IndustryId,
  initialLobbyState: LobbyState,
): { space: SpatialSpace; focus: SpatialFocus } {
  if (pathname === "/workspace") {
    return { space: "workspace", focus: getWorkspaceFocus() };
  }
  if (pathname === "/manufacturing") {
    return { space: "showroom", focus: getManufacturingFocus(getIndustryById(industryId)) };
  }
  if (pathname.startsWith("/products/")) {
    const productIds: Record<string, string> = {
      flexible: "product:coffee:0",
      carton: "product:cosmetics:0",
      label: "product:cosmetics:1",
      bags: "product:daily-care:0",
    };
    const slug = pathname.split("/")[2] ?? "";
    const focus = getProductFocusById(productIds[slug], getIndustryById(industryId));
    return { space: "product", focus };
  }

  const space = lobbyStateToSpace(initialLobbyState);
  return { space, focus: buildSpaceFocus(space, industryId) };
}

/**
 * Override written by an action inside the current route.
 * 当前路由内由动作写入的共享焦点覆盖值；路由变化后自动失效，回到 URL 默认焦点。
 */
interface FocusOverride {
  routeKey: string;
  focus: SpatialFocus;
  space: SpatialSpace;
  previous: SpatialFocus | null;
  industryId: IndustryId;
}

/** Action Layer｜动作层：点击、Packy 快捷调用与未来语音都进入这里。 */
export interface SpatialActions {
  openLobby(): void;
  openShowroom(industryId?: IndustryId): void;
  openWorkspace(): void;
  openProduct(productId?: string): void;
  showMaterials(industryId?: IndustryId): void;
  showManufacturing(stage?: ManufacturingStageId, industryId?: IndustryId): void;
  showCases(industryId?: IndustryId): void;
  playMedia(mediaId: string): void;
  goBack(): void;
  openConversation(): void;
  closeConversation(): void;
  pinConversation(pinned?: boolean): void;
}

export interface LastActionRecord {
  actionId: SpatialActionId;
  call: string;
  at: number;
}

interface ExperienceContextValue {
  /* View / Standard View compatibility｜视图与标准视图兼容部分 */
  viewMode: ViewMode;
  selectedIndustry: IndustryId;
  lobbyState: LobbyState;
  mainScreenChapter: MainScreenChapter;
  packyState: PackyState;
  activeJourneyStep: JourneyStepId;
  prefersReducedMotion: boolean;
  setViewMode: (mode: ViewMode) => void;
  setSelectedIndustry: (industry: IndustryId) => void;
  focusIndustry: (industry: IndustryId) => void;
  returnToLobby: () => void;
  setMainScreenChapter: (chapter: MainScreenChapter) => void;
  setPackyState: (state: PackyState) => void;
  setActiveJourneyStep: (step: JourneyStepId) => void;

  /* Spatial shared scene + focus｜空间共享场景与焦点 */
  currentSpace: SpatialSpace;
  activeFocus: SpatialFocus;
  previousFocus: SpatialFocus | null;
  selectedObjectId: string;
  activeMediaId: string | null;
  activeDetail: SpatialDetailId | null;
  lastAction: LastActionRecord | null;

  /* Shared conversation｜共享对话 */
  conversationVisibility: ConversationVisibility;
  conversationPinned: boolean;
  messages: ConversationMessage[];
  draft: string;
  setDraft: (value: string) => void;
  sendMessage: () => void;
  sendMessageText: (text: string) => void;
  addLocalNote: (text: string) => void;

  actions: SpatialActions;
  /** Single entry used by config-driven UI. 配置驱动界面的统一入口。 */
  dispatchAction: (
    actionId: SpatialActionId,
    argument?: string,
    source?: "manual" | "packy-demo",
  ) => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

interface ExperienceProviderProps {
  children: ReactNode;
  initialIndustry?: IndustryId;
  initialLobbyState?: LobbyState;
}

export function ExperienceProvider({
  children,
  initialIndustry = "coffee",
  initialLobbyState = "default",
}: ExperienceProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // The public HTML starts in Standard View so every route has readable content.
  // An explicit saved preference still restores Spatial View after hydration.
  const [viewMode, setViewModeState] = useState<ViewMode>("standard");
  const [mainScreenChapter, setMainScreenChapter] = useState<MainScreenChapter>("intro");
  const [packyState, setPackyState] = useState<PackyState>("open");
  const [activeJourneyStep, setActiveJourneyStep] = useState<JourneyStepId>("solution");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  /**
   * Route props stay the source of truth for the default focus of a URL.
   * 路由参数是该 URL 默认焦点的来源：直达、返回、前进都会自动回到正确空间。
   */
  const routeKey = `${pathname}:${initialIndustry}:${initialLobbyState}`;
  const routeState = useMemo(
    () => focusForRoute(pathname, initialIndustry, initialLobbyState),
    [pathname, initialIndustry, initialLobbyState],
  );
  const routeSpace = routeState.space;
  const routeFocus = routeState.focus;

  const [focusOverride, setFocusOverride] = useState<FocusOverride | null>(null);
  const activeOverride = focusOverride && focusOverride.routeKey === routeKey ? focusOverride : null;

  const activeFocus = activeOverride?.focus ?? routeFocus;
  const currentSpace = activeOverride?.space ?? routeSpace;
  const previousFocus = activeOverride?.previous ?? null;
  const selectedIndustry = activeOverride?.industryId ?? routeFocus.industryId ?? initialIndustry;

  const selectedObjectId = activeFocus.id;
  const activeMediaId = activeFocus.mediaId ?? null;
  const activeDetail = detailIdForFocusKind(activeFocus.kind);
  const [lastAction, setLastAction] = useState<LastActionRecord | null>(null);

  const [conversationVisibility, setConversationVisibility] = useState<ConversationVisibility>("hidden");
  const [conversationPinned, setConversationPinned] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>(packySeedMessages);
  const [draft, setDraft] = useState("");
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setPrefersReducedMotion(media.matches);
    media.addEventListener("change", syncMotionPreference);

    const initialPreferenceFrame = window.requestAnimationFrame(() => {
      syncMotionPreference();
      const savedMode = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);
      if (savedMode === "spatial" || savedMode === "standard") {
        setViewModeState(savedMode);
      } else if (media.matches || window.innerWidth < 880) {
        setViewModeState("standard");
      }
      if (window.innerWidth < 980) {
        setPackyState("collapsed");
      }

      const rawSession = window.sessionStorage.getItem(CONVERSATION_STORAGE_KEY);
      if (rawSession) {
        try {
          const parsed = JSON.parse(rawSession) as {
            messages?: ConversationMessage[];
            draft?: string;
            pinned?: boolean;
            open?: boolean;
          };
          if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
            setMessages(parsed.messages.map(normalizeStoredMessage));
          }
          if (typeof parsed.draft === "string") {
            setDraft(parsed.draft);
          }
          // 「固定」和「打开着」是两件事，分开恢复：
          // 上次打开着就恢复打开（含换页后）——Packy 是"陪着你看"的面板，
          // 不该因为点了别的地方/换了页面就自己消失。
          if (parsed.pinned) setConversationPinned(true);
          if (parsed.pinned || parsed.open) setConversationVisibility("open");
        } catch {
          window.sessionStorage.removeItem(CONVERSATION_STORAGE_KEY);
        }
      }
      setSessionReady(true);
    });

    return () => {
      window.cancelAnimationFrame(initialPreferenceFrame);
      media.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!sessionReady) return;
    window.sessionStorage.setItem(
      CONVERSATION_STORAGE_KEY,
      // open 也要存：换页（例如点导航）会重新挂载本 Provider，
      // 只存 pinned 会导致"打开着 Packy 点了别的地方，它就没了"。
      JSON.stringify({
        messages,
        draft,
        pinned: conversationPinned,
        open: conversationVisibility === "open",
      }),
    );
  }, [conversationPinned, conversationVisibility, draft, messages, sessionReady]);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
  }, []);

  /** Shared focus update: one place writes scene + focus + previous + industry. */
  const applyFocus = useCallback(
    (focus: SpatialFocus, space: SpatialSpace) => {
      const sameFocus = focus.id === activeFocus.id && focus.kind === activeFocus.kind;
      setFocusOverride({
        routeKey,
        focus,
        space,
        previous: sameFocus ? previousFocus : activeFocus,
        industryId: focus.industryId ?? selectedIndustry,
      });
    },
    [activeFocus, previousFocus, routeKey, selectedIndustry],
  );

  const setSelectedIndustry = useCallback(
    (industry: IndustryId) => {
      setFocusOverride({
        routeKey,
        focus: activeFocus,
        space: currentSpace,
        previous: previousFocus,
        industryId: industry,
      });
    },
    [activeFocus, currentSpace, previousFocus, routeKey],
  );

  const openLobby = useCallback(() => {
    applyFocus(getPlatformFocus(), "lobby");
    if (pathname !== "/") router.push("/");
  }, [applyFocus, pathname, router]);

  /**
   * Industry-scoped content always belongs to the showroom URL.
   * 行业相关内容必须与展厅 URL 对齐，避免状态与地址栏各说一套。
   */
  const ensureShowroomRoute = useCallback(
    (route: string) => {
      if (pathname !== route) router.push(route);
    },
    [pathname, router],
  );

  const openShowroom = useCallback(
    (industryId?: IndustryId) => {
      const industry = getIndustryById(industryId ?? selectedIndustry);
      applyFocus(getSolutionFocus(industry), "showroom");
      ensureShowroomRoute(industry.route);
    },
    [applyFocus, ensureShowroomRoute, selectedIndustry],
  );

  const openWorkspace = useCallback(() => {
    applyFocus(getWorkspaceFocus(), "workspace");
  }, [applyFocus]);

  const openProduct = useCallback(
    (productId?: string) => {
      const industry = getIndustryById(selectedIndustry);
      applyFocus(getProductFocusById(productId, industry), "product");
      ensureShowroomRoute(industry.route);
    },
    [applyFocus, ensureShowroomRoute, selectedIndustry],
  );

  const showMaterials = useCallback(
    (industryId?: IndustryId) => {
      const industry = getIndustryById(industryId ?? selectedIndustry);
      applyFocus(getMaterialsFocus(industry), "showroom");
      ensureShowroomRoute(industry.route);
    },
    [applyFocus, ensureShowroomRoute, selectedIndustry],
  );

  const showManufacturing = useCallback(
    (stage: ManufacturingStageId = "overview", industryId?: IndustryId) => {
      const industry = getIndustryById(industryId ?? selectedIndustry);
      applyFocus(getManufacturingFocus(industry, stage), "showroom");
      ensureShowroomRoute(industry.route);
    },
    [applyFocus, ensureShowroomRoute, selectedIndustry],
  );

  const showCases = useCallback(
    (industryId?: IndustryId) => {
      const industry = getIndustryById(industryId ?? selectedIndustry);
      applyFocus(getCasesFocus(industry), "showroom");
      ensureShowroomRoute(industry.route);
    },
    [applyFocus, ensureShowroomRoute, selectedIndustry],
  );

  const playMedia = useCallback(
    (mediaId: string) => {
      const media = getMediaById(mediaId);
      if (!media) return;
      if (media.owner === "platform") {
        applyFocus(
          { ...getPlatformFocus(), mediaId: media.id, mediaLabel: `${media.label} · ${media.caption}` },
          "lobby",
        );
        return;
      }

      const industry = getIndustryById(selectedIndustry);
      applyFocus(
        {
          ...getManufacturingFocus(industry),
          mediaId: media.id,
          mediaLabel: `${media.label} · ${media.caption}`,
        },
        "showroom",
      );
      ensureShowroomRoute(industry.route);
    },
    [applyFocus, ensureShowroomRoute, selectedIndustry],
  );

  const goBack = useCallback(() => {
    const previous = previousFocus;
    if (previous && previous.id !== activeFocus.id) {
      if (previous.kind === "platform") {
        openLobby();
        return;
      }
      if (previous.kind === "solution" && previous.industryId) {
        openShowroom(previous.industryId);
        return;
      }
      applyFocus(previous, spaceForFocusKind(previous.kind));
      return;
    }
    if (currentSpace !== "lobby") openLobby();
  }, [activeFocus, applyFocus, currentSpace, openLobby, openShowroom, previousFocus]);

  const openConversation = useCallback(() => setConversationVisibility("open"), []);

  const closeConversation = useCallback(() => {
    setConversationVisibility("hidden");
    setConversationPinned(false);
  }, []);

  const pinConversation = useCallback(
    (pinned?: boolean) => {
      const next = pinned ?? !conversationPinned;
      setConversationPinned(next);
      if (next) setConversationVisibility("open");
    },
    [conversationPinned],
  );

  const sendMessageText = useCallback((text: string) => {
    const body = text.trim();
    if (!body) return;

    const customerMessage: ConversationMessage = {
      id: nextMessageId(),
      role: "customer",
      label: "你 · 本地消息",
      body,
    };
    const localNotice: ConversationMessage = {
      id: nextMessageId(),
      role: "system",
      label: "本地原型",
      body: "内容仅保存在当前浏览器会话中。没有调用 AI，也不会自动生成回复。",
    };

    setMessages((current) => [...current, customerMessage, localNotice]);
  }, []);

  const addLocalNote = useCallback((text: string) => {
    const body = text.trim();
    if (!body) return;
    setMessages((current) => [...current, {
      id: nextMessageId(),
      role: "system",
      label: "页面操作 · 本地记录",
      body,
    }]);
  }, []);

  const sendMessage = useCallback(() => {
    if (!draft.trim()) return;
    sendMessageText(draft);
    setDraft("");
  }, [draft, sendMessageText]);

  const actions = useMemo<SpatialActions>(
    () => ({
      openLobby,
      openShowroom,
      openWorkspace,
      openProduct,
      showMaterials,
      showManufacturing,
      showCases,
      playMedia,
      goBack,
      openConversation,
      closeConversation,
      pinConversation,
    }),
    [
      closeConversation,
      goBack,
      openConversation,
      openLobby,
      openProduct,
      openShowroom,
      openWorkspace,
      pinConversation,
      playMedia,
      showCases,
      showManufacturing,
      showMaterials,
    ],
  );

  const dispatchAction = useCallback(
    (actionId: SpatialActionId, argument?: string, source: "manual" | "packy-demo" = "manual") => {
      switch (actionId) {
        case "openLobby":
          actions.openLobby();
          break;
        case "openShowroom":
          actions.openShowroom(argument as IndustryId | undefined);
          break;
        case "openWorkspace":
          actions.openWorkspace();
          break;
        case "openProduct":
          actions.openProduct(argument);
          break;
        case "showMaterials":
          actions.showMaterials(argument as IndustryId | undefined);
          break;
        case "showManufacturing":
          actions.showManufacturing(argument === "printing" ? "printing" : "overview");
          break;
        case "showCases":
          actions.showCases();
          break;
        case "playMedia":
          actions.playMedia(argument ?? "");
          break;
        case "goBack":
          actions.goBack();
          break;
        case "openConversation":
          actions.openConversation();
          break;
        case "closeConversation":
          actions.closeConversation();
          break;
        case "pinConversation":
          actions.pinConversation();
          break;
        default:
          break;
      }

      const call = describeActionCall(actionId, argument);
      setLastAction({ actionId, call, at: Date.now() });

      if (source === "packy-demo") {
        const notice: ConversationMessage = {
          id: nextMessageId(),
          role: "system",
          label: "Packy · 本地演示操作",
          body: "Packy 已通过与手动点击相同的动作层完成页面操作。本次没有调用 AI。",
        };
        setMessages((current) => [...current, notice]);
      }
    },
    [actions],
  );

  const focusIndustry = useCallback(
    (industry: IndustryId) => {
      // 兼容旧行业导航：只写共享状态，不接管路由（链接自身负责跳转）。
      applyFocus(getSolutionFocus(getIndustryById(industry)), "showroom");
    },
    [applyFocus],
  );

  const returnToLobby = useCallback(() => openLobby(), [openLobby]);

  const lobbyState: LobbyState =
    currentSpace === "lobby" ? "default" : currentSpace === "product" ? "product-focus" : "cabinet-focus";

  const value = useMemo<ExperienceContextValue>(
    () => ({
      viewMode,
      selectedIndustry,
      lobbyState,
      mainScreenChapter,
      packyState,
      activeJourneyStep,
      prefersReducedMotion,
      setViewMode,
      setSelectedIndustry,
      focusIndustry,
      returnToLobby,
      setMainScreenChapter,
      setPackyState,
      setActiveJourneyStep,
      currentSpace,
      activeFocus,
      previousFocus,
      selectedObjectId,
      activeMediaId,
      activeDetail,
      lastAction,
      conversationVisibility,
      conversationPinned,
      messages,
      draft,
      setDraft,
      sendMessage,
      sendMessageText,
      addLocalNote,
      actions,
      dispatchAction,
    }),
    [
      actions,
      activeDetail,
      activeFocus,
      activeJourneyStep,
      activeMediaId,
      conversationPinned,
      conversationVisibility,
      currentSpace,
      dispatchAction,
      draft,
      focusIndustry,
      lastAction,
      lobbyState,
      mainScreenChapter,
      messages,
      packyState,
      prefersReducedMotion,
      previousFocus,
      returnToLobby,
      selectedIndustry,
      selectedObjectId,
      sendMessage,
      sendMessageText,
      addLocalNote,
      setSelectedIndustry,
      setViewMode,
      viewMode,
    ],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): ExperienceContextValue {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  }
  return context;
}
