import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { getExpenses } from "@/features/finance/expenses/api/expense.api";
import { getCategories } from "@/features/finance/categories/api/category.api";
import { enrichCategories } from "@/features/finance/analytics/helpers/analytics.helpers";

import AnalyticsSummaryCards from "@/features/finance/analytics/components/AnalyticsSummaryCards";
import BudgetVsSpentChart from "@/features/finance/analytics/components/BudgetVsSpentChart";
import ExpenseTrendChart from "@/features/finance/analytics/components/ExpenseTrendChart";
import CategoryBreakdownChart from "@/features/finance/analytics/components/CategoryBreakdownChart";
import MonthlySpendingChart from "@/features/finance/analytics/components/MonthlySpendingChart";
import TopSpendingCategories from "@/features/finance/analytics/components/TopSpendingCategories";

const AnalyticsPage = () => {
  const { data: rawCategories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: expenses = [], isLoading: expensesLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const isLoading = categoriesLoading || expensesLoading;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const categories = enrichCategories(rawCategories, expenses);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Analyze wedding spending, budget performance, and financial trends"
      />

      <AnalyticsSummaryCards categories={categories} />

      <BudgetVsSpentChart categories={categories} />

      <ExpenseTrendChart expenses={expenses} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryBreakdownChart categories={categories} />
        <MonthlySpendingChart expenses={expenses} />
      </div>

      <TopSpendingCategories categories={categories} />
    </div>
  );
};

export default AnalyticsPage;