import type { JourneyStepConfig, StoryChapterConfig } from "@/lib/types";

export const storyChapters: StoryChapterConfig[] = [
  {
    id: "intro",
    label: "认识 PACKGO",
    title: "让包装需求连接真实制造。",
    summary: "在一个连贯的数字包装展厅中，看懂包装方向、解决方案与生产制造。",
    visualNote: "占位：龙岗制造、包装成品与明亮克制的展厅光线。",
  },
  {
    id: "how-it-works",
    label: "如何运作",
    title: "从模糊想法走向清晰的包装方向。",
    summary: "未来将把需求探索、产品方向、制造知识与项目入口连接在同一条路径中。",
    visualNote: "占位：需求 → 方案 → 产品 → 工艺 → 项目。",
  },
  {
    id: "why-packgo",
    label: "为什么选择 PACKGO",
    title: "用更清晰的方式理解复杂的包装选择。",
    summary: "内容、空间引导与 Packy 共享同一上下文，让客户不必反复说明需求。",
    visualNote: "占位：沿同一决策路径展示材料与表面工艺样品。",
  },
  {
    id: "manufacturing-network",
    label: "制造网络",
    title: "让真实的制造网络清晰可见。",
    summary: "后续将用经过核实的资料展示工艺、设备、质量节点与供应能力，不虚构制造事实。",
    visualNote: "占位：生产现场、工艺节点、设备与质量检查点。",
  },
  {
    id: "workspace",
    label: "项目空间",
    title: "当浏览变成项目，上下文仍应持续。",
    summary: "当前只预留未来客户项目空间的衔接位置，尚未建设登录、询价或后台流程。",
    visualNote: "占位：项目入口与结构化需求交接。",
  },
];

export const journeySteps: JourneyStepConfig[] = [
  {
    id: "solution",
    number: "01",
    label: "解决方案",
    title: "先看清想要的包装结果",
    description: "快速了解所选行业、使用场景以及客户正在寻找的包装方向。",
    placeholder: "占位：成品形态、使用场景与经过核实的方案概览。",
  },
  {
    id: "products",
    number: "02",
    label: "产品",
    title: "比较代表性的包装结构",
    description: "未来在这里比较不同包装形态，同时避免把网站做成普通商品商城。",
    placeholder: "占位：产品展示、结构视图与代表性样品。",
  },
  {
    id: "materials-features",
    number: "03",
    label: "材料与功能",
    title: "理解包装由什么构成",
    description: "能力库就绪后，将使用经过核实的内容引导客户理解材料与功能特性。",
    placeholder: "占位：材料层、阻隔性能、封口结构、表面工艺与通俗说明。",
  },
  {
    id: "process-manufacturing",
    number: "04",
    label: "工艺与制造",
    title: "了解包装如何被制造出来",
    description: "后续将连接真实工艺、设备、生产视频与质量检查节点。",
    placeholder: "占位：工艺顺序、生产画面、设备与检验节点。",
  },
  {
    id: "cases-start-project",
    number: "05",
    label: "案例 / 开始项目",
    title: "决定是否启动项目",
    description: "未来将通过已核实案例和受控项目入口承接客户下一步行动。",
    placeholder: "仅作占位：没有虚构案例，也未开放询价、登录或真实项目提交。",
  },
];
