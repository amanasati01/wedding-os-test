export type SummaryMetric = {
  id: string;
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
};

export type ExpenseTrend = {
  month: string;
  budget: number;
  spent: number;
};

export type BudgetCategory = {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  color: string;
};

export type ExpenseItem = {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
};

export type UpcomingPayment = {
  id: string;
  vendor: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "scheduled" | "pending" | "overdue";
};
