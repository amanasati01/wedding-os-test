import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import type { Expense } from "@/features/finance/expenses/types/expense.types";
import type {
  FinancialSummary,
  BudgetPerformance,
  CategoryHighlight,
  CategoryReportRow,
  ExpenseReportRow,
} from "../types/report.types";

// ── Summary Calculations ───────────────────────────────────────────────────────

export function calculateTotalBudget(categories: BudgetCategory[]): number {
  return categories.reduce((sum, c) => sum + c.allocated, 0);
}

export function calculateTotalSpent(categories: BudgetCategory[]): number {
  return categories.reduce((sum, c) => sum + c.spent, 0);
}

export function calculateRemainingBudget(categories: BudgetCategory[]): number {
  return calculateTotalBudget(categories) - calculateTotalSpent(categories);
}

export function calculateUtilization(categories: BudgetCategory[]): number {
  const budget = calculateTotalBudget(categories);
  if (budget === 0) return 0;
  return Math.round((calculateTotalSpent(categories) / budget) * 100);
}

export function getFinancialSummary(
  categories: BudgetCategory[],
  expenses: Expense[]
): FinancialSummary {
  return {
    totalBudget: calculateTotalBudget(categories),
    totalSpent: calculateTotalSpent(categories),
    remainingBudget: calculateRemainingBudget(categories),
    utilization: calculateUtilization(categories),
    totalCategories: categories.length,
    totalExpenses: expenses.length,
  };
}

// ── Budget Performance ─────────────────────────────────────────────────────────

function toCategoryHighlight(c: BudgetCategory): CategoryHighlight {
  return {
    name: c.name,
    color: c.color,
    spent: c.spent,
    allocated: c.allocated,
    utilization: c.allocated > 0 ? Math.round((c.spent / c.allocated) * 100) : 0,
  };
}

export function getHighestSpendingCategory(
  categories: BudgetCategory[]
): CategoryHighlight {
  const sorted = [...categories].sort((a, b) => b.spent - a.spent);
  return toCategoryHighlight(sorted[0]);
}

export function getLowestSpendingCategory(
  categories: BudgetCategory[]
): CategoryHighlight {
  const sorted = [...categories].sort((a, b) => a.spent - b.spent);
  return toCategoryHighlight(sorted[0]);
}

export function getMostUtilizedCategory(
  categories: BudgetCategory[]
): CategoryHighlight {
  const withUtil = categories.map((c) => ({
    ...c,
    util: c.allocated > 0 ? c.spent / c.allocated : 0,
  }));
  const sorted = [...withUtil].sort((a, b) => b.util - a.util);
  return toCategoryHighlight(sorted[0]);
}

export function getLeastUtilizedCategory(
  categories: BudgetCategory[]
): CategoryHighlight {
  const withUtil = categories.map((c) => ({
    ...c,
    util: c.allocated > 0 ? c.spent / c.allocated : 0,
  }));
  const sorted = [...withUtil].sort((a, b) => a.util - b.util);
  return toCategoryHighlight(sorted[0]);
}

export function getBudgetPerformance(
  categories: BudgetCategory[]
): BudgetPerformance {
  return {
    highestSpending: getHighestSpendingCategory(categories),
    lowestSpending: getLowestSpendingCategory(categories),
    mostUtilized: getMostUtilizedCategory(categories),
    leastUtilized: getLeastUtilizedCategory(categories),
  };
}

// ── Report Tables ──────────────────────────────────────────────────────────────

export function getCategoryReportData(
  categories: BudgetCategory[]
): CategoryReportRow[] {
  return categories.map((c) => ({
    ...c,
    remaining: c.allocated - c.spent,
    utilization: c.allocated > 0 ? Math.round((c.spent / c.allocated) * 100) : 0,
  }));
}

export function getExpenseReportData(
  expenses: Expense[],
  categories: BudgetCategory[]
): ExpenseReportRow[] {
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  return [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((e) => {
      const category = categoryMap.get(e.categoryId);
      return {
        id: e.id,
        title: e.title,
        categoryName: category?.name ?? "Unknown",
        categoryColor: category?.color ?? "#6b7280",
        vendor: e.vendor,
        amount: e.amount,
        date: e.date,
        status: e.status,
      };
    });
}

// ── Formatting ─────────────────────────────────────────────────────────────────

export const formatINR = (n: number): string =>
  `₹${n.toLocaleString("en-IN")}`;

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
