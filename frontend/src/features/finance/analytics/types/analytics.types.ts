import type { BudgetCategory } from "@/features/finance/categories/types/category.types";

export type AnalyticsSummary = {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  utilization: number;
};

export type BudgetVsSpentItem = {
  name: string;
  allocated: number;
  spent: number;
  color: string;
};

export type CategoryBreakdownItem = {
  name: string;
  value: number;
  color: string;
  percentage: number;
};

export type ExpenseTrendItem = {
  date: string;
  amount: number;
  cumulative: number;
};

export type MonthlySpendingItem = {
  month: string;
  total: number;
};

export type TopSpendingCategory = BudgetCategory & {
  utilization: number;
  remaining: number;
  rank: number;
};
