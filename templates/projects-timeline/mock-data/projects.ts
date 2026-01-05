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

// Create a fixed dataset for debugging
// Get the current week (Monday to Sunday)
function getCurrentWeekStart(): Date {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  const monday = new Date(today.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function createFixedProjects(): Project[] {
  const weekStart = getCurrentWeekStart();
  
  // Create dates for the current week (Monday = day 0, Sunday = day 6)
  const monday = new Date(weekStart);
  monday.setHours(0, 0, 0, 0);
  
  const tuesday = new Date(monday);
  tuesday.setDate(tuesday.getDate() + 1);
  
  const wednesday = new Date(monday);
  wednesday.setDate(wednesday.getDate() + 2);
  
  const thursday = new Date(monday);
  thursday.setDate(thursday.getDate() + 3);
  
  const friday = new Date(monday);
  friday.setDate(friday.getDate() + 4);
  
  const saturday = new Date(monday);
  saturday.setDate(saturday.getDate() + 5);
  
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  return [
    {
      id: "proj-1",
      title: "Frontend Optimization",
      startDate: monday, // Mon
      endDate: saturday, // Sat (6 days: Mon-Sat)
      priority: "high",
      status: "in-progress",
      assignedUsers: ["user1", "user2", "user3"],
      color: "blue",
    },
    {
      id: "proj-2",
      title: "Network Security",
      startDate: tuesday, // Tue
      endDate: thursday, // Thu (3 days: Tue-Thu)
      priority: "medium",
      status: "in-progress",
      assignedUsers: ["user4", "user5"],
      color: "red",
    },
    {
      id: "proj-3",
      title: "Database Migration",
      startDate: wednesday, // Wed
      endDate: friday, // Fri (3 days: Wed-Fri)
      priority: "high",
      status: "in-progress",
      assignedUsers: ["user1", "user6"],
      color: "purple",
    },
    {
      id: "proj-4",
      title: "API Integration",
      startDate: monday, // Mon
      endDate: wednesday, // Wed (3 days: Mon-Wed)
      priority: "low",
      status: "in-progress",
      assignedUsers: ["user2", "user3", "user4"],
      color: "green",
    },
    {
      id: "proj-5",
      title: "UI Design",
      startDate: thursday, // Thu
      endDate: sunday, // Sun (4 days: Thu-Sun)
      priority: "medium",
      status: "in-progress",
      assignedUsers: ["user5", "user6"],
      color: "orange",
    },
    {
      id: "proj-6",
      title: "Bug Fixes",
      startDate: friday, // Fri
      endDate: saturday, // Sat (2 days: Fri-Sat)
      priority: "high",
      status: "in-progress",
      assignedUsers: ["user1"],
      color: "yellow",
    },
    {
      id: "proj-7",
      title: "Code Review",
      startDate: monday, // Mon
      endDate: sunday, // Sun (7 days: full week)
      priority: "low",
      status: "in-progress",
      assignedUsers: ["user2", "user3", "user4", "user5"],
      color: "cyan",
    },
  ];
}

// Use fixed dataset for consistent debugging
export const projects: Project[] = createFixedProjects();

// Uncomment below to use random data instead:
// const startDate = new Date(2020, 0, 1);
// const endDate = new Date(2070, 11, 31);
// export const projects: Project[] = generateProjectsForDateRange(
//   startDate,
//   endDate
// );
