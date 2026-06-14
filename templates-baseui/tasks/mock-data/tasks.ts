import { Status, statuses } from "./statuses";
import { User, users } from "./users";

export interface Task {
  id: string;
  title: string;
  project: string;
  status: Status;
  assignees: User[];
  priority: "low" | "medium" | "urgent";
  dueDate: string;
  comments: number;
  attachments: number;
}

export const tasks: Task[] = [
  // Draft - 3 tasks
  {
    id: "1",
    title: "Follow up with Rajesh Kumar",
    project: "TechCorp Upgrade",
    status: statuses[0],
    assignees: [users[0], users[1]],
    priority: "urgent",
    dueDate: "Jan 14, 25",
    comments: 21,
    attachments: 12,
  },
  {
    id: "2",
    title: "Send Proposal to Bytebase",
    project: "Bytebase",
    status: statuses[0],
    assignees: [users[0], users[1]],
    priority: "medium",
    dueDate: "Jan 14, 25",
    comments: 21,
    attachments: 12,
  },
  {
    id: "3",
    title: "Prepare quarterly report",
    project: "TechCorp Upgrade",
    status: statuses[0],
    assignees: [users[2]],
    priority: "low",
    dueDate: "Jan 18, 25",
    comments: 8,
    attachments: 5,
  },

  // Todo - 5 tasks
  {
    id: "4",
    title: "Client meeting preparation",
    project: "Nova Redesign",
    status: statuses[1],
    assignees: [users[0], users[3]],
    priority: "urgent",
    dueDate: "Jan 20, 25",
    comments: 15,
    attachments: 3,
  },
  {
    id: "5",
    title: "Review team feedback",
    project: "Fintra Expansion",
    status: statuses[1],
    assignees: [users[1]],
    priority: "medium",
    dueDate: "Jan 22, 25",
    comments: 4,
    attachments: 2,
  },
  {
    id: "6",
    title: "Update documentation",
    project: "Bytebase",
    status: statuses[1],
    assignees: [users[2], users[3]],
    priority: "low",
    dueDate: "Jan 25, 25",
    comments: 6,
    attachments: 8,
  },
  {
    id: "7",
    title: "Schedule demo with ZenLoom",
    project: "Zenloom App",
    status: statuses[1],
    assignees: [users[0], users[1]],
    priority: "low",
    dueDate: "Jan 14, 25",
    comments: 21,
    attachments: 12,
  },
  {
    id: "8",
    title: "Backend API integration",
    project: "TechCorp Upgrade",
    status: statuses[1],
    assignees: [users[2]],
    priority: "urgent",
    dueDate: "Jan 16, 25",
    comments: 32,
    attachments: 7,
  },

  // In Progress - 2 tasks
  {
    id: "9",
    title: "Design system updates",
    project: "Nova Redesign",
    status: statuses[2],
    assignees: [users[0], users[2]],
    priority: "medium",
    dueDate: "Jan 18, 25",
    comments: 14,
    attachments: 9,
  },
  {
    id: "10",
    title: "Mobile responsiveness fixes",
    project: "Zenloom App",
    status: statuses[2],
    assignees: [users[1], users[3]],
    priority: "urgent",
    dueDate: "Jan 19, 25",
    comments: 27,
    attachments: 4,
  },

  // Review - 4 tasks
  {
    id: "11",
    title: "Review contract for Fintra",
    project: "Fintra Expansion",
    status: statuses[3],
    assignees: [users[0], users[1]],
    priority: "urgent",
    dueDate: "Jan 14, 25",
    comments: 21,
    attachments: 12,
  },
  {
    id: "12",
    title: "Check-in with Flowdesk",
    project: "Bytebase",
    status: statuses[3],
    assignees: [users[0], users[1]],
    priority: "low",
    dueDate: "Jan 14, 25",
    comments: 21,
    attachments: 12,
  },
  {
    id: "13",
    title: "Code review for auth module",
    project: "TechCorp Upgrade",
    status: statuses[3],
    assignees: [users[2], users[3]],
    priority: "medium",
    dueDate: "Jan 17, 25",
    comments: 45,
    attachments: 3,
  },
  {
    id: "14",
    title: "Security audit review",
    project: "Nova Redesign",
    status: statuses[3],
    assignees: [users[1]],
    priority: "urgent",
    dueDate: "Jan 19, 25",
    comments: 38,
    attachments: 15,
  },

  // Completed - 5 tasks
  {
    id: "15",
    title: "Update notes for AetherSoft",
    project: "Bytebase",
    status: statuses[4],
    assignees: [users[0], users[1]],
    priority: "urgent",
    dueDate: "Jan 14, 25",
    comments: 21,
    attachments: 12,
  },
  {
    id: "16",
    title: "Send Proposal to Bytebase",
    project: "Bytebase",
    status: statuses[4],
    assignees: [users[0], users[1]],
    priority: "low",
    dueDate: "Jan 14, 25",
    comments: 21,
    attachments: 12,
  },
  {
    id: "17",
    title: "Initial project setup",
    project: "TechCorp Upgrade",
    status: statuses[4],
    assignees: [users[2]],
    priority: "medium",
    dueDate: "Jan 10, 25",
    comments: 18,
    attachments: 6,
  },
  {
    id: "18",
    title: "Database migration complete",
    project: "Nova Redesign",
    status: statuses[4],
    assignees: [users[1], users[3]],
    priority: "urgent",
    dueDate: "Jan 12, 25",
    comments: 35,
    attachments: 9,
  },
  {
    id: "19",
    title: "Launch marketing campaign",
    project: "Zenloom App",
    status: statuses[4],
    assignees: [users[0]],
    priority: "medium",
    dueDate: "Jan 13, 25",
    comments: 42,
    attachments: 20,
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
