import { Label, labels } from "./labels";
import { Status, statuses } from "./statuses";
import { User, users } from "./users";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  assignees: User[];
  labels: Label[];
  date?: string;
  comments: number;
  attachments: number;
  links: number;
  progress: { completed: number; total: number };
  priority: "low" | "medium" | "high" | "urgent" | "no-priority";
}

export const tasks: Task[] = [
  // Backlog - 3 tasks
  {
    id: "1",
    title: "Mobile app redesign",
    description: "Complete redesign of mobile application for better UX",
    status: statuses[0], // backlog
    assignees: [],
    labels: [labels[0]],
    date: "Feb 10",
    comments: 2,
    attachments: 5,
    links: 3,
    progress: { completed: 0, total: 0 },
    priority: "low",
  },
  {
    id: "2",
    title: "API documentation update",
    description: "Update API docs with latest endpoints and examples",
    status: statuses[0], // backlog
    assignees: [users[1]],
    labels: [labels[2]],
    date: "Feb 15",
    comments: 0,
    attachments: 0,
    links: 8,
    progress: { completed: 0, total: 0 },
    priority: "low",
  },
  {
    id: "3",
    title: "Accessibility improvements",
    description:
      "Enhance accessibility for screen readers and keyboard navigation",
    status: statuses[0], // backlog
    assignees: [users[2]],
    labels: [labels[0], labels[3]],
    date: "Feb 20",
    comments: 1,
    attachments: 2,
    links: 5,
    progress: { completed: 0, total: 0 },
    priority: "medium",
  },

  // To-do - 4 tasks
  {
    id: "4",
    title: "Design system update",
    description: "Enhance design system for consistency and usability",
    status: statuses[1], // to-do
    assignees: [users[0], users[1]],
    labels: [labels[0], labels[3]],
    date: "Jan 25",
    comments: 4,
    attachments: 0,
    links: 0,
    progress: { completed: 1, total: 4 },
    priority: "high",
  },
  {
    id: "5",
    title: "Retention rate by 23%",
    description: "Improve retention through campaigns and feature updates",
    status: statuses[1], // to-do
    assignees: [users[0], users[1]],
    labels: [labels[1], labels[2]],
    date: "Jan 25",
    comments: 4,
    attachments: 33,
    links: 12,
    progress: { completed: 0, total: 0 },
    priority: "medium",
  },
  {
    id: "6",
    title: "Icon system",
    description: "Develop scalable icons for cohesive platform visuals",
    status: statuses[1], // to-do
    assignees: [users[0], users[2]],
    labels: [labels[0]],
    date: "Jan 25",
    comments: 4,
    attachments: 0,
    links: 0,
    progress: { completed: 1, total: 4 },
    priority: "high",
  },
  {
    id: "7",
    title: "Task automation",
    description: "Automate repetitive tasks to improve productivity",
    status: statuses[1], // to-do
    assignees: [users[2], users[3]],
    labels: [labels[2]],
    date: "Jan 28",
    comments: 2,
    attachments: 5,
    links: 3,
    progress: { completed: 0, total: 3 },
    priority: "low",
  },

  // In Progress - 2 tasks
  {
    id: "8",
    title: "Search features",
    description: "Upgrade search for faster, accurate user results",
    status: statuses[2], // in-progress
    assignees: [users[3]],
    labels: [labels[2]],
    date: "Jan 25",
    comments: 0,
    attachments: 0,
    links: 12,
    progress: { completed: 0, total: 0 },
    priority: "urgent",
  },
  {
    id: "9",
    title: "Checkout flow design",
    description: "Optimize checkout process to improve conversion rates",
    status: statuses[2], // in-progress
    assignees: [users[0]],
    labels: [labels[0]],
    date: "Jan 25",
    comments: 0,
    attachments: 0,
    links: 12,
    progress: { completed: 2, total: 4 },
    priority: "urgent",
  },

  // Technical Review - 3 tasks
  {
    id: "10",
    title: "Payment gateway integration",
    description: "Integrate Stripe payment system for subscriptions",
    status: statuses[3], // technical-review
    assignees: [users[2], users[3]],
    labels: [labels[2]],
    date: "Jan 20",
    comments: 8,
    attachments: 0,
    links: 5,
    progress: { completed: 3, total: 4 },
    priority: "high",
  },
  {
    id: "11",
    title: "Security audit fixes",
    description: "Implement fixes from recent security audit report",
    status: statuses[3], // technical-review
    assignees: [users[0]],
    labels: [labels[2]],
    date: "Jan 22",
    comments: 3,
    attachments: 7,
    links: 2,
    progress: { completed: 2, total: 3 },
    priority: "urgent",
  },
  {
    id: "12",
    title: "Code review optimizations",
    description: "Review and optimize codebase for better performance",
    status: statuses[3], // technical-review
    assignees: [users[1], users[2]],
    labels: [labels[2], labels[3]],
    date: "Jan 21",
    comments: 10,
    attachments: 0,
    links: 7,
    progress: { completed: 1, total: 2 },
    priority: "high",
  },

  // Paused - 5 tasks
  {
    id: "13",
    title: "Third-party API upgrade",
    description: "Waiting for vendor to release new API version",
    status: statuses[4], // paused
    assignees: [users[1], users[2]],
    labels: [labels[2]],
    date: "Jan 18",
    comments: 6,
    attachments: 3,
    links: 4,
    progress: { completed: 1, total: 4 },
    priority: "medium",
  },
  {
    id: "14",
    title: "Database migration",
    description: "Paused pending infrastructure team approval",
    status: statuses[4], // paused
    assignees: [users[3]],
    labels: [labels[2], labels[1]],
    date: "Jan 15",
    comments: 12,
    attachments: 15,
    links: 6,
    progress: { completed: 0, total: 5 },
    priority: "high",
  },
  {
    id: "15",
    title: "Server upgrade",
    description: "Waiting for budget approval from management",
    status: statuses[4], // paused
    assignees: [users[0], users[3]],
    labels: [labels[2]],
    date: "Jan 12",
    comments: 8,
    attachments: 5,
    links: 2,
    progress: { completed: 0, total: 3 },
    priority: "urgent",
  },
  {
    id: "16",
    title: "Legal compliance review",
    description: "Paused pending legal team review and approval",
    status: statuses[4], // paused
    assignees: [users[1]],
    labels: [labels[1]],
    date: "Jan 10",
    comments: 15,
    attachments: 20,
    links: 8,
    progress: { completed: 2, total: 4 },
    priority: "high",
  },
  {
    id: "17",
    title: "Cloud migration",
    description: "Waiting for vendor contract negotiations to complete",
    status: statuses[4], // paused
    assignees: [users[2], users[3]],
    labels: [labels[2], labels[3]],
    date: "Jan 8",
    comments: 10,
    attachments: 12,
    links: 7,
    progress: { completed: 1, total: 6 },
    priority: "medium",
  },

  // Completed - 2 tasks
  {
    id: "18",
    title: "Increase conversion rate by 25%",
    description: "Boost conversions through better onboarding and experience",
    status: statuses[5], // completed
    assignees: [users[0], users[3]],
    labels: [labels[1]],
    date: "Jan 25",
    comments: 4,
    attachments: 0,
    links: 0,
    progress: { completed: 4, total: 4 },
    priority: "high",
  },
  {
    id: "19",
    title: "Improve team efficiency",
    description: "Achieved efficiency improvements with tools and workflows",
    status: statuses[5], // completed
    assignees: [users[3], users[1]],
    labels: [],
    date: "Jan 23",
    comments: 0,
    attachments: 33,
    links: 12,
    progress: { completed: 4, total: 4 },
    priority: "medium",
  },
];

export function groupTasksByStatus(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce<Record<string, Task[]>>((acc, task) => {
    const statusId = task.status.id;

    if (!acc[statusId]) {
      acc[statusId] = [];
    }

    acc[statusId].push(task);

    return acc;
  }, {});
}
