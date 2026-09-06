import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import type { Expense } from "@/features/finance/expenses/types/expense.types";
import type {
  AnalyticsSummary,
  BudgetVsSpentItem,
  CategoryBreakdownItem,
  ExpenseTrendItem,
  MonthlySpendingItem,
  TopSpendingCategory,
} from "../types/analytics.types";

export function enrichCategories(
  categories: BudgetCategory[],
  expenses: Expense[]
): BudgetCategory[] {
  return categories.map((cat) => {
    const spent = expenses
      .filter((e) => e.categoryId === cat.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return { ...cat, spent };
  });
}

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

export function calculateBudgetUtilization(
  categories: BudgetCategory[]
): number {
  const budget = calculateTotalBudget(categories);
  if (budget === 0) return 0;
  return Math.round((calculateTotalSpent(categories) / budget) * 100);
}

export function getAnalyticsSummary(
  categories: BudgetCategory[]
): AnalyticsSummary {
  return {
    totalBudget: calculateTotalBudget(categories),
    totalSpent: calculateTotalSpent(categories),
    remaining: calculateRemainingBudget(categories),
    utilization: calculateBudgetUtilization(categories),
  };
}

// ── Chart Data Transformers ────────────────────────────────────────────────────

export function getBudgetVsSpentData(
  categories: BudgetCategory[]
): BudgetVsSpentItem[] {
  return categories.map((c) => ({
    name: c.name,
    allocated: c.allocated,
    spent: c.spent,
    color: c.color,
  }));
}

export function getCategoryBreakdownData(
  categories: BudgetCategory[]
): CategoryBreakdownItem[] {
  const totalSpent = calculateTotalSpent(categories);

  return categories.map((c) => ({
    name: c.name,
    value: c.spent,
    color: c.color,
    percentage: totalSpent > 0 ? Math.round((c.spent / totalSpent) * 100) : 0,
  }));
}

export function getExpenseTrendData(expenses: Expense[]): ExpenseTrendItem[] {
  const sorted = [...expenses].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let cumulative = 0;
  return sorted.map((e) => {
    cumulative += e.amount;
    return {
      date: new Date(e.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      amount: e.amount,
      cumulative,
    };
  });
}

export function getMonthlySpendingData(
  expenses: Expense[]
): MonthlySpendingItem[] {
  const monthMap = new Map<string, { total: number; sortKey: number }>();

  expenses.forEach((e) => {
    const d = new Date(e.date);
    const key = d.toLocaleString("en-IN", { month: "short", year: "numeric" });
    const sortKey = d.getFullYear() * 100 + d.getMonth();
    const existing = monthMap.get(key);
    monthMap.set(key, {
      total: (existing?.total || 0) + e.amount,
      sortKey: existing?.sortKey || sortKey,
    });
  });

  return Array.from(monthMap.entries())
    .sort((a, b) => a[1].sortKey - b[1].sortKey)
    .map(([month, { total }]) => ({ month, total }));
}

export function getTopSpendingCategories(
  categories: BudgetCategory[]
): TopSpendingCategory[] {
  return [...categories]
    .map((c) => ({
      ...c,
      remaining: c.allocated - c.spent,
      utilization:
        c.allocated > 0 ? Math.round((c.spent / c.allocated) * 100) : 0,
      rank: 0,
    }))
    .sort((a, b) => b.spent - a.spent)
    .map((c, index) => ({ ...c, rank: index + 1 }));
}

// ── Formatting ─────────────────────────────────────────────────────────────────

export const formatCurrency = (value: number): string => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
};

export const formatINR = (n: number): string =>
  `₹${n.toLocaleString("en-IN")}`;
