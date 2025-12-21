import { LeadStatus, LeadSource } from "@/store/leads-store";

export interface Lead {
  id: string;
  leadId: string;
  name: string;
  email: string;
  avatar: string;
  status: LeadStatus;
  source: LeadSource;
  owner: string;
  ownerInitials: string;
  createdAt: string;
  createdTimestamp: number;
}

const firstNames = [
  "John", "Jane", "Alex", "Emily", "Michael", "Sarah", "David", "Emma",
  "James", "Olivia", "Robert", "Sophia", "William", "Isabella", "Thomas",
  "Mia", "Daniel", "Charlotte", "Matthew", "Amelia", "Christopher", "Harper",
  "Andrew", "Evelyn", "Joshua", "Abigail", "Ryan", "Lily", "Brandon", "Madison",
  "Kevin", "Grace", "Justin", "Chloe", "Aaron", "Victoria", "Nathan", "Penelope",
  "Jacob", "Riley", "Ethan", "Zoey", "Luke", "Natalie", "Benjamin", "Hannah",
  "Henry", "Scarlett", "Sebastian", "Aria"
];

const lastNames = [
  "Doe", "Smith", "Johnson", "Davis", "Brown", "Wilson", "Moore", "Taylor",
  "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson",
  "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee",
  "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez",
  "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
  "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker",
  "Evans", "Edwards", "Collins", "Stewart", "Sanchez"
];

const owners = [
  { name: "Alex Ray", initials: "AR" },
  { name: "Mina Swan", initials: "MS" },
  { name: "John Kim", initials: "JK" },
  { name: "Sarah Lee", initials: "SL" },
];

const statuses: LeadStatus[] = ["new", "contacted", "qualified", "negotiation", "inactive", "recycled"];
const sources: LeadSource[] = ["website", "paid_ads", "referral", "social", "email"];

function getDateString(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`;
}

function getTimestamp(daysAgo: number): number {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.getTime();
}

export const leads: Lead[] = Array.from({ length: 50 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];
  const owner = owners[index % owners.length];
  const status = statuses[index % statuses.length];
  const source = sources[index % sources.length];
  const daysAgo = index % 30;

  return {
    id: (index + 1).toString(),
    leadId: `LD21${(301 + index).toString().padStart(3, "0")}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${firstName}${lastName}`,
    status,
    source,
    owner: owner.name,
    ownerInitials: owner.initials,
    createdAt: getDateString(daysAgo),
    createdTimestamp: getTimestamp(daysAgo),
  };
});

export const leadStats = {
  totalLeads: 340,
  totalLeadsChange: 20,
  totalLeadsChangeValue: 36,
  contactedLeads: 92,
  contactedLeadsChange: 20,
  contactedLeadsChangeValue: 14,
  qualifiedLeads: 38,
  qualifiedLeadsChange: 20,
  qualifiedLeadsChangeValue: 8,
  hotLeads: 12,
  hotLeadsChange: 20,
  hotLeadsChangeValue: 4,
};

export const leadsByStatus = {
  total: 3612,
  totalChange: 20,
  totalChangeValue: 244,
  data: [
    { name: "New Leads", value: 1420, color: "#375dfb" },
    { name: "Contacted", value: 980, color: "#6985fc" },
    { name: "Qualified", value: 620, color: "#9baefd" },
    { name: "Negotiation", value: 280, color: "#7f69fc" },
    { name: "Inactive", value: 190, color: "#aa9bfd" },
    { name: "Recycled", value: 122, color: "#b069fc" },
  ],
};

export const monthlyLeadGrowth = [
  { month: "Jan", leads: 120 },
  { month: "Feb", leads: 180 },
  { month: "Mar", leads: 240 },
  { month: "Apr", leads: 340 },
  { month: "May", leads: 280 },
  { month: "Jun", leads: 320 },
  { month: "Jul", leads: 0 },
  { month: "Aug", leads: 380 },
  { month: "Sep", leads: 420 },
  { month: "Oct", leads: 460 },
  { month: "Nov", leads: 0 },
  { month: "Dec", leads: 0 },
];
