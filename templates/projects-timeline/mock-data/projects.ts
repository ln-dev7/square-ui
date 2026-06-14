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

// Deterministic seeded PRNG (mulberry32) so the generated projects are
// identical on the server and the client. Using Math.random() here caused a
// React hydration mismatch because the project set differed between SSR and CSR.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getRandomColor(rand: () => number) {
  return colors[Math.floor(rand() * colors.length)];
}

function getRandomPriority(rand: () => number): Priority {
  return priorities[Math.floor(rand() * priorities.length)];
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

  // Seed the PRNG from the week (days since epoch) so each week is stable.
  const rand = mulberry32(Math.floor(weekStart.getTime() / 86400000));

  const numProjects = 6 + Math.floor(rand() * 10);

  for (let i = 0; i < numProjects; i++) {
    const dayOffset = Math.floor(rand() * 6);
    const duration = 2 + Math.floor(rand() * 5);
    const startDay = new Date(weekStart);
    startDay.setDate(startDay.getDate() + dayOffset);
    const endDay = new Date(startDay);
    endDay.setDate(endDay.getDate() + duration - 1);

    if (endDay <= weekEnd) {
      projectsForWeek.push({
        id: `proj-${weekStart.getTime()}-${i}`,
        title: projectTitles[Math.floor(rand() * projectTitles.length)],
        startDate: startDay,
        endDate: endDay,
        priority: getRandomPriority(rand),
        status: "in-progress",
        assignedUsers: generateUsers(2 + Math.floor(rand() * 7)),
        color: getRandomColor(rand),
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
