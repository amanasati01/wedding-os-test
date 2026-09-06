import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import type { ExpenseStatus } from "@/features/finance/expenses/types/expense.types";

// ── Summary ────────────────────────────────────────────────────────────────────

export type FinancialSummary = {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  utilization: number;
  totalCategories: number;
  totalExpenses: number;
};

// ── Budget Performance ─────────────────────────────────────────────────────────

export type CategoryHighlight = {
  name: string;
  color: string;
  spent: number;
  allocated: number;
  utilization: number;
};

export type BudgetPerformance = {
  highestSpending: CategoryHighlight;
  lowestSpending: CategoryHighlight;
  mostUtilized: CategoryHighlight;
  leastUtilized: CategoryHighlight;
};

// ── Category Report ────────────────────────────────────────────────────────────

export type CategoryReportRow = BudgetCategory & {
  remaining: number;
  utilization: number;
};

// ── Expense Report ─────────────────────────────────────────────────────────────

export type ExpenseReportRow = {
  id: string;
  title: string;
  categoryName: string;
  categoryColor: string;
  vendor: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
};

// ── Filters ────────────────────────────────────────────────────────────────────

export type ReportFilters = {
  categoryId: string;
  status: string;
  dateFrom: string;
  dateTo: string;
};
