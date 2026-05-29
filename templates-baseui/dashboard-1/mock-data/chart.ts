export type ChartDataPoint = {
  month: string;
  newLeads: number;
  replied: number;
};

export const mockChartData: ChartDataPoint[] = [
  { month: "Jan", newLeads: 600, replied: 400 },
  { month: "Feb", newLeads: 800, replied: 600 },
  { month: "Mar", newLeads: 748, replied: 512 },
  { month: "Apr", newLeads: 900, replied: 700 },
  { month: "May", newLeads: 500, replied: 350 },
  { month: "Jun", newLeads: 750, replied: 550 },
];

