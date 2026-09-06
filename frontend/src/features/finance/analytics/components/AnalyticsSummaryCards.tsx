import SummaryCard from "@/components/finance/SummaryCard";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import { getAnalyticsSummary, formatINR } from "../helpers/analytics.helpers";

type AnalyticsSummaryCardsProps = {
  categories: BudgetCategory[];
};

const AnalyticsSummaryCards = ({ categories }: AnalyticsSummaryCardsProps) => {
  const summary = getAnalyticsSummary(categories);
  const isOverBudget = summary.remaining < 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Budget"
        value={formatINR(summary.totalBudget)}
      />
      <SummaryCard
        title="Total Spent"
        value={formatINR(summary.totalSpent)}
        change={`${summary.utilization}% utilized`}
        trend={summary.utilization > 80 ? "up" : "neutral"}
      />
      <SummaryCard
        title="Remaining Budget"
        value={formatINR(Math.abs(summary.remaining))}
        change={isOverBudget ? "Over budget" : "Under budget"}
        trend={isOverBudget ? "down" : "up"}
      />
      <SummaryCard
        title="Budget Utilization"
        value={`${summary.utilization}%`}
        change={
          summary.utilization > 80
            ? "High utilization"
            : "Healthy utilization"
        }
        trend={summary.utilization > 80 ? "down" : "up"}
      />
    </div>
  );
};

export default AnalyticsSummaryCards;
