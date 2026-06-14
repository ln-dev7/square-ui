export interface StatCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeValue: string;
  isPositive: boolean;
  icon: string;
}

export const statsData: StatCard[] = [
  {
    id: "1",
    title: "Product Revenue",
    value: "$10,312.10",
    change: "+20%",
    changeValue: "($2,423)",
    isPositive: true,
    icon: "coins",
  },
  {
    id: "2",
    title: "Total Sales Product",
    value: "224",
    change: "+20%",
    changeValue: "(84)",
    isPositive: true,
    icon: "box",
  },
  {
    id: "3",
    title: "Total Deals",
    value: "3,612",
    change: "-15%",
    changeValue: "(134)",
    isPositive: false,
    icon: "users",
  },
  {
    id: "4",
    title: "Convo Rate",
    value: "67%",
    change: "-12%",
    changeValue: "",
    isPositive: false,
    icon: "messages",
  },
];

export const leadSourcesData = [
  { name: "Website", value: 1445, color: "#35b9e9" },
  { name: "Paid Ads", value: 903, color: "#6e3ff3" },
  { name: "Emails", value: 722, color: "#375dfb" },
  { name: "Referral", value: 451, color: "#e255f2" },
];

export const revenueFlowData = [
  { month: "Jan", thisYear: 38000, prevYear: 32000 },
  { month: "Feb", thisYear: 42000, prevYear: 38000 },
  { month: "Mar", thisYear: 51500, prevYear: 37000 },
  { month: "Apr", thisYear: 47000, prevYear: 31000 },
  { month: "May", thisYear: 49000, prevYear: 35000 },
  { month: "Jun", thisYear: 45000, prevYear: 33000 },
];


