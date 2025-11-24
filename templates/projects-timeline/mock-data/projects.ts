export type Priority = "high" | "medium" | "low";

export type ProjectStatus = "not-started" | "in-progress" | "completed";

export interface Project {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  priority: Priority;
  status: ProjectStatus;
  assignedUsers: string[];
  color: string;
}

const colors = [
  "blue",
  "orange",
  "yellow",
  "purple",
  "red",
  "green",
  "pink",
  "indigo",
  "cyan",
] as const;
const priorities: Priority[] = ["high", "medium", "low"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomPriority(): Priority {
  return priorities[Math.floor(Math.random() * priorities.length)];
}

function generateUsers(count: number) {
  return Array.from({ length: count }, (_, i) => `user${i + 1}`);
}

const projectTitles = [
  "Review and Update Job",
  "Update Employee Record",
  "Project Management",
  "Exchange Website Design",
  "HR Management",
  "UI Design",
  "Product Design",
  "Database Migration",
  "API Integration",
  "Security Audit",
  "Performance Optimization",
  "User Testing",
  "Documentation Update",
  "Feature Implementation",
  "Bug Fixes",
  "Deployment Preparation",
  "Client Presentation",
  "Code Review",
  "Training Session",
  "System Maintenance",
  "Mobile App Development",
  "Backend Refactoring",
  "Frontend Optimization",
  "Data Analysis",
  "Customer Support",
  "Marketing Campaign",
  "Sales Report",
  "Inventory Management",
  "Quality Assurance",
  "DevOps Setup",
  "Cloud Migration",
  "Network Security",
  "Content Management",
  "E-commerce Platform",
  "Analytics Dashboard",
];

function generateProjectsForWeek(weekStart: Date): Project[] {
  const projectsForWeek: Project[] = [];
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const numProjects = 6 + Math.floor(Math.random() * 10);

  for (let i = 0; i < numProjects; i++) {
    const dayOffset = Math.floor(Math.random() * 6);
    const duration = 2 + Math.floor(Math.random() * 5);
    const startDay = new Date(weekStart);
    startDay.setDate(startDay.getDate() + dayOffset);
    const endDay = new Date(startDay);
    endDay.setDate(endDay.getDate() + duration - 1);

    if (endDay <= weekEnd) {
      projectsForWeek.push({
        id: `proj-${weekStart.getTime()}-${i}`,
        title: projectTitles[Math.floor(Math.random() * projectTitles.length)],
        startDate: startDay,
        endDate: endDay,
        priority: getRandomPriority(),
        status: "in-progress",
        assignedUsers: generateUsers(2 + Math.floor(Math.random() * 7)),
        color: getRandomColor(),
      });
    }
  }

  return projectsForWeek;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function generateProjectsForDateRange(
  startDate: Date,
  endDate: Date
): Project[] {
  const allProjects: Project[] = [];
  const startWeek = getWeekStart(startDate);
  const endWeek = getWeekStart(endDate);

  let currentWeek = new Date(startWeek);

  while (currentWeek <= endWeek) {
    const weekProjects = generateProjectsForWeek(currentWeek);
    allProjects.push(...weekProjects);

    currentWeek = new Date(currentWeek);
    currentWeek.setDate(currentWeek.getDate() + 7);
  }

  return allProjects;
}

const startDate = new Date(2020, 0, 1);
const endDate = new Date(2070, 11, 31);

export const projects: Project[] = generateProjectsForDateRange(
  startDate,
  endDate
);
