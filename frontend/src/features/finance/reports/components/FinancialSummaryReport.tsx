import SummaryCard from "@/components/finance/SummaryCard";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import type { Expense } from "@/features/finance/expenses/types/expense.types";
import { getFinancialSummary, formatINR } from "../helpers/reports.helpers";

type FinancialSummaryReportProps = {
  categories: BudgetCategory[];
  expenses: Expense[];
};

const FinancialSummaryReport = ({
  categories,
  expenses,
}: FinancialSummaryReportProps) => {
  const summary = getFinancialSummary(categories, expenses);
  const isOverBudget = summary.remainingBudget < 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <SummaryCard
        title="Total Budget"
        value={formatINR(summary.totalBudget)}
      />
      <SummaryCard
        title="Total Spent"
        value={formatINR(summary.totalSpent)}
        change={`${summary.utilization}% of budget`}
        trend={summary.utilization > 80 ? "down" : "neutral"}
      />
      <SummaryCard
        title="Remaining Budget"
        value={formatINR(Math.abs(summary.remainingBudget))}
        change={isOverBudget ? "Over budget" : "Under budget"}
        trend={isOverBudget ? "down" : "up"}
      />
      <SummaryCard
        title="Budget Utilization"
        value={`${summary.utilization}%`}
        change={
          summary.utilization > 80 ? "High utilization" : "Healthy spending"
        }
        trend={summary.utilization > 80 ? "down" : "up"}
      />
      <SummaryCard
        title="Total Categories"
        value={summary.totalCategories}
      />
      <SummaryCard
        title="Total Expenses"
        value={summary.totalExpenses}
      />
    </div>
  );
};

export default FinancialSummaryReport;
