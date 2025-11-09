export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  icon: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export const mockChats: Chat[] = [
  {
    id: "1",
    title: "Instant Decision Support LLM Outputs",
    icon: "zap",
    messages: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    isArchived: false,
  },
  {
    id: "2",
    title: "Continuous Workflow Optimization LLM Responses",
    icon: "message-circle-dashed",
    messages: [],
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    isArchived: false,
  },
  {
    id: "3",
    title: "Innovative Task Planning LLM Creations",
    icon: "wand-sparkles",
    messages: [],
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
    isArchived: false,
  },
  {
    id: "4",
    title: "Dynamic Progress Tracking LLM Insights",
    icon: "message-circle-dashed",
    messages: [],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    isArchived: false,
  },
  {
    id: "5",
    title: "Structured Resource Allocation LLM Solutions",
    icon: "box",
    messages: [],
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-11"),
    isArchived: true,
  },
  {
    id: "6",
    title: "Multi-Dimensional Risk Analysis LLM Reports",
    icon: "wand-sparkles",
    messages: [],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    isArchived: true,
  },
  {
    id: "7",
    title: "Rapid Team Coordination LLM Updates",
    icon: "box",
    messages: [],
    createdAt: new Date("2024-01-09"),
    updatedAt: new Date("2024-01-09"),
    isArchived: true,
  },
  {
    id: "8",
    title: "Precision Project Evaluation LLM Summaries",
    icon: "zap",
    messages: [],
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
    isArchived: true,
  },
];

