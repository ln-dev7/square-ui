export type PeriodFilter = "30days" | "3months" | "1year";

export interface ExpenseDataPoint {
  month: string;
  value: number;
}

export interface DeductionDataPoint {
  month: string;
  taxes: number;
  deductions: number;
}

export interface ChartSummary {
  total: number;
  change: number;
  isPositive: boolean;
}

export const payrollExpenseData: Record<PeriodFilter, ExpenseDataPoint[]> = {
  "30days": [
    { month: "Jan", value: 180000 },
    { month: "Feb", value: 220000 },
    { month: "Mar", value: 195000 },
    { month: "Apr", value: 250000 },
    { month: "May", value: 230000 },
  ],
  "3months": [
    { month: "Oct", value: 210000 },
    { month: "Nov", value: 185000 },
    { month: "Dec", value: 240000 },
    { month: "Jan", value: 195000 },
    { month: "Feb", value: 220000 },
    { month: "Mar", value: 250000 },
  ],
  "1year": [
    { month: "Jan", value: 180000 },
    { month: "Feb", value: 195000 },
    { month: "Mar", value: 210000 },
    { month: "Apr", value: 185000 },
    { month: "May", value: 220000 },
    { month: "Jun", value: 240000 },
    { month: "Jul", value: 230000 },
    { month: "Aug", value: 255000 },
    { month: "Sep", value: 245000 },
    { month: "Oct", value: 260000 },
    { month: "Nov", value: 275000 },
    { month: "Dec", value: 290000 },
  ],
};

export const deductionsTaxesData: Record<PeriodFilter, DeductionDataPoint[]> = {
  "30days": [
    { month: "Jan", taxes: 54000, deductions: 33000 },
    { month: "Feb", taxes: 62000, deductions: 18000 },
    { month: "Mar", taxes: 49000, deductions: 20000 },
    { month: "Apr", taxes: 71000, deductions: 13000 },
    { month: "May", taxes: 38000, deductions: 13000 },
  ],
  "3months": [
    { month: "Oct", taxes: 58000, deductions: 28000 },
    { month: "Nov", taxes: 52000, deductions: 22000 },
    { month: "Dec", taxes: 68000, deductions: 35000 },
    { month: "Jan", taxes: 55000, deductions: 25000 },
    { month: "Feb", taxes: 63000, deductions: 19000 },
    { month: "Mar", taxes: 72000, deductions: 15000 },
  ],
  "1year": [
    { month: "Jan", taxes: 45000, deductions: 28000 },
    { month: "Feb", taxes: 52000, deductions: 22000 },
    { month: "Mar", taxes: 48000, deductions: 25000 },
    { month: "Apr", taxes: 55000, deductions: 30000 },
    { month: "May", taxes: 60000, deductions: 18000 },
    { month: "Jun", taxes: 65000, deductions: 20000 },
    { month: "Jul", taxes: 58000, deductions: 24000 },
    { month: "Aug", taxes: 70000, deductions: 15000 },
    { month: "Sep", taxes: 68000, deductions: 22000 },
    { month: "Oct", taxes: 72000, deductions: 19000 },
    { month: "Nov", taxes: 78000, deductions: 25000 },
    { month: "Dec", taxes: 85000, deductions: 32000 },
  ],
};

export const expenseSummary: Record<PeriodFilter, ChartSummary> = {
  "30days": { total: 250000, change: 12.5, isPositive: false },
  "3months": { total: 665000, change: 8.2, isPositive: true },
  "1year": { total: 2785000, change: 15.3, isPositive: true },
};

export const deductionsSummary: Record<PeriodFilter, ChartSummary> = {
  "30days": { total: 750000, change: 10.3, isPositive: true },
  "3months": { total: 512000, change: 5.8, isPositive: true },
  "1year": { total: 1032000, change: 18.7, isPositive: true },
};

export const periodLabels: Record<PeriodFilter, string> = {
  "30days": "Last 30 Days",
  "3months": "Last 3 Months",
  "1year": "Last Year",
};
