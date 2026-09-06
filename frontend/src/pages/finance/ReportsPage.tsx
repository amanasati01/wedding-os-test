import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/features/finance/categories/api/category.api";
import { getExpenses } from "@/features/finance/expenses/api/expense.api";
import { enrichCategories } from "@/features/finance/analytics/helpers/analytics.helpers";

import FinancialSummaryReport from "@/features/finance/reports/components/FinancialSummaryReport";
import BudgetPerformanceReport from "@/features/finance/reports/components/BudgetPerformanceReport";
import CategoryReportTable from "@/features/finance/reports/components/CategoryReportTable";
import ExpenseReportTable from "@/features/finance/reports/components/ExpenseReportTable";
import ReportFilters from "@/features/finance/reports/components/ReportFilters";
import type { ReportFilters as ReportFiltersType } from "@/features/finance/reports/types/report.types";

const defaultFilters: ReportFiltersType = {
  categoryId: "all",
  status: "all",
  dateFrom: "",
  dateTo: "",
};

const ReportsPage = () => {
  const [filters, setFilters] = useState<ReportFiltersType>(defaultFilters);

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
        title="Reports"
        description="Review financial reports and wedding budget performance"
      />

      <FinancialSummaryReport
        categories={categories}
        expenses={expenses}
      />

      <ReportFilters
        categories={categories}
        filters={filters}
        onChange={setFilters}
      />

      <BudgetPerformanceReport categories={categories} />

      <CategoryReportTable categories={categories} />

      <ExpenseReportTable
        expenses={expenses}
        categories={categories}
      />

      {/* Export Reports – Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>
            Download financial reports in your preferred format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" disabled>
              Export PDF
            </Button>
            <Button variant="outline" disabled>
              Export CSV
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Export functionality will be available in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;