export interface Employee {
  id: string;
  userId: string;
  name: string;
  email: string;
  department: "IT" | "HR" | "Finance" | "Marketing" | "Sales";
  jobTitle: string;
  joinedDate: string;
  status: "Active" | "On Leave" | "Probation" | "Inactive";
  avatar?: string;
}

const departments: Employee["department"][] = ["IT", "HR", "Finance", "Marketing", "Sales"];
const statuses: Employee["status"][] = ["Active", "On Leave", "Probation", "Inactive"];

const jobTitles: Record<Employee["department"], string[]> = {
  IT: ["Software Engineer", "UX Designer", "DevOps Engineer", "Data Analyst", "Frontend Developer"],
  HR: ["HR Manager", "Talent Acquisition", "HR Coordinator", "Training Specialist", "Recruiter"],
  Finance: ["Accountant", "Financial Analyst", "Controller", "Budget Analyst", "Payroll Specialist"],
  Marketing: ["Digital Marketer", "Content Manager", "SEO Specialist", "Brand Manager", "Marketing Analyst"],
  Sales: ["Sales Executive", "Account Manager", "Sales Representative", "Business Developer", "Sales Manager"],
};

const firstNames = [
  "John", "Jane", "Alex", "Emily", "Michael", "Sarah", "Daniel", "Olivia",
  "James", "Emma", "William", "Sophia", "Benjamin", "Isabella", "Lucas",
  "Mia", "Henry", "Charlotte", "Alexander", "Amelia", "Sebastian", "Harper",
  "Jack", "Evelyn", "Owen", "Abigail", "Theodore", "Ella", "Aiden", "Scarlett",
  "Samuel", "Grace", "Joseph", "Chloe", "David", "Victoria", "Matthew", "Riley",
  "Jackson", "Aria", "Ethan", "Lily", "Noah", "Hannah", "Logan", "Zoe",
  "Ryan", "Nora", "Nathan", "Mila"
];

const lastNames = [
  "Doe", "Smith", "Johnson", "Davis", "Brown", "Wilson", "Lee", "Clark",
  "Miller", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White",
  "Harris", "Martin", "Garcia", "Martinez", "Robinson", "Lewis", "Walker",
  "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill",
  "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter",
  "Roberts", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards",
  "Collins", "Reyes", "Stewart", "Morris"
];

const dates = [
  "01 Jan 2024", "12 Feb 2024", "05 Mar 2024", "18 Apr 2024", "22 May 2024",
  "09 Jun 2024", "14 Jul 2024", "28 Aug 2024", "03 Sep 2024", "17 Oct 2024",
  "25 Nov 2024", "08 Dec 2024", "15 Jan 2025", "20 Feb 2025", "10 Mar 2025",
  "02 Apr 2025", "19 May 2025", "06 Jun 2025", "23 Jul 2025", "11 Aug 2025",
  "04 Sep 2025", "27 Oct 2025", "13 Nov 2025", "30 Dec 2025", "07 Jan 2024",
  "16 Feb 2024", "21 Mar 2024", "08 Apr 2024", "29 May 2024", "12 Jun 2024",
  "01 Jul 2024", "19 Aug 2024", "26 Sep 2024", "10 Oct 2024", "03 Nov 2024",
  "22 Dec 2024", "09 Jan 2025", "14 Feb 2025", "28 Mar 2025", "05 Apr 2025",
  "17 May 2025", "24 Jun 2025", "02 Jul 2025", "15 Aug 2025", "20 Sep 2025",
  "08 Oct 2025", "25 Nov 2025", "12 Dec 2025", "18 Jan 2024", "06 Feb 2024"
];

const statusPattern = [
  "Active", "Active", "Active", "On Leave", "Active",
  "Probation", "Active", "Inactive", "Active", "Active",
  "On Leave", "Active", "Probation", "Active", "Active",
  "Active", "Inactive", "Active", "Active", "On Leave",
  "Active", "Active", "Probation", "Active", "Active",
  "Active", "On Leave", "Active", "Active", "Inactive",
  "Active", "Active", "Active", "Probation", "Active",
  "On Leave", "Active", "Active", "Active", "Active",
  "Inactive", "Active", "On Leave", "Active", "Probation",
  "Active", "Active", "Active", "On Leave", "Active"
] as Employee["status"][];

const jobTitleIndices = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4];

const hasAvatar = [
  true, true, true, false, true, true, true, true, false, true,
  true, false, true, true, true, true, true, false, true, true,
  false, true, true, true, true, true, false, true, true, true,
  true, true, true, false, true, true, true, false, true, true,
  true, true, false, true, true, true, true, true, false, true
];

export const employees: Employee[] = Array.from({ length: 50 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const department = departments[i % departments.length];
  const jobTitle = jobTitles[department][jobTitleIndices[i] % jobTitles[department].length];
  const status = statusPattern[i];
  
  return {
    id: (i + 1).toString(),
    userId: `EMP-${(1001 + i).toString()}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    department,
    jobTitle,
    joinedDate: dates[i],
    status,
    avatar: hasAvatar[i] ? `https://api.dicebear.com/9.x/glass/svg?seed=${firstName}${lastName}` : undefined,
  };
});

export const financialFlowData = [
  { month: "Jan", moneyIn: 180000, moneyOut: 120000 },
  { month: "Feb", moneyIn: 200000, moneyOut: 140000 },
  { month: "Mar", moneyIn: 220000, moneyOut: 150000 },
  { month: "Apr", moneyIn: 280000, moneyOut: 175000 },
  { month: "May", moneyIn: 250000, moneyOut: 160000 },
  { month: "Jun", moneyIn: 230000, moneyOut: 145000 },
  { month: "Jul", moneyIn: 210000, moneyOut: 130000 },
  { month: "Aug", moneyIn: 240000, moneyOut: 155000 },
  { month: "Sep", moneyIn: 260000, moneyOut: 165000 },
  { month: "Oct", moneyIn: 275000, moneyOut: 170000 },
  { month: "Nov", moneyIn: 290000, moneyOut: 180000 },
  { month: "Dec", moneyIn: 310000, moneyOut: 190000 },
];
