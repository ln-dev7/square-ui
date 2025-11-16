export type StatCard = {
  id: string;
  title: string;
  value: string;
  icon: string;
};

export const mockStats: StatCard[] = [
  {
    id: "1",
    title: "Total Clients",
    value: "67",
    icon: "users",
  },
  {
    id: "2",
    title: "Active Projects",
    value: "12",
    icon: "clipboard",
  },
  {
    id: "3",
    title: "Weekly Revenue",
    value: "$4,571",
    icon: "wallet",
  },
  {
    id: "4",
    title: "Sent Invoices",
    value: "32",
    icon: "invoice",
  },
];

