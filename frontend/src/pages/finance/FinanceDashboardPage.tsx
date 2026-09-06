import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { getExpenses } from "@/features/finance/expenses/api/expense.api";
import { getCategories } from "@/features/finance/categories/api/category.api";

// Components
import DashboardSummary from "@/features/finance/dashboard/components/DashboardSummary";
import ExpenseTrendChart from "@/features/finance/dashboard/components/ExpenseTrendChart";
import BudgetDistributionChart from "@/features/finance/dashboard/components/BudgetDistributionChart";
import BudgetCategoryProgress from "@/features/finance/dashboard/components/BudgetCategoryProgress";
import RecentExpenses from "@/features/finance/dashboard/components/RecentExpenses";
import UpcomingPayments from "@/features/finance/dashboard/components/UpcomingPayments";

// Types
import type { 
  SummaryMetric, 
  ExpenseTrend, 
  BudgetCategory as DashboardCategory, 
  ExpenseItem, 
  UpcomingPayment 
} from "@/features/finance/dashboard/types/dashboard.types";

const COLORS = ["#6366f1", "#f43f5e", "#f59e0b", "#10b981", "#8b5cf6", "#06b6d4", "#64748b"];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const FinanceDashboardPage = () => {
  const { data: rawCategories = [], isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: rawExpenses = [], isLoading: expLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  if (catLoading || expLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 1. Summary Metrics
  const totalBudget = rawCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = rawExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = totalBudget - totalSpent;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthSpent = rawExpenses
    .filter((exp) => {
      const d = new Date(exp.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const summaryMetrics: SummaryMetric[] = [
    { id: "total-budget", title: "Total Budget", value: formatCurrency(totalBudget) },
    { id: "total-spent", title: "Total Spent", value: formatCurrency(totalSpent) },
    { id: "remaining", title: "Remaining", value: formatCurrency(remaining) },
    { id: "this-month", title: "This Month", value: formatCurrency(thisMonthSpent) },
  ];

  // 2. Budget Categories
  const dashboardCategories: DashboardCategory[] = rawCategories.map((cat, index) => {
    const categorySpent = rawExpenses
      .filter((exp) => exp.categoryId === cat.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      id: cat.id,
      category: cat.name,
      allocated: cat.allocated,
      spent: categorySpent,
      color: COLORS[index % COLORS.length],
    };
  });

  // 3. Expense Trends (Monthly breakdown)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyBudget = totalBudget / 12;

  const trendDataMap = new Map<string, { budget: number; spent: number }>();
  monthNames.forEach((month) => {
    trendDataMap.set(month, { budget: monthlyBudget, spent: 0 });
  });

  rawExpenses.forEach((exp) => {
    const d = new Date(exp.date);
    if (d.getFullYear() === currentYear) {
      const monthStr = monthNames[d.getMonth()];
      const current = trendDataMap.get(monthStr)!;
      current.spent += exp.amount;
    }
  });

  const expenseTrendData: ExpenseTrend[] = Array.from(trendDataMap.entries()).map(([month, data]) => ({
    month,
    budget: data.budget,
    spent: data.spent,
  }));

  // 4. Recent Expenses
  const recentExpenses: ExpenseItem[] = [...rawExpenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
    .map((exp) => {
      const cat = rawCategories.find((c) => c.id === exp.categoryId);
      return {
        id: exp.id,
        title: exp.title,
        category: cat ? cat.name : "Uncategorized",
        amount: exp.amount,
        date: exp.date.split("T")[0],
        status: exp.status === "Paid" ? "paid" : "pending",
      };
    });

  // 5. Upcoming Payments
  const upcomingPayments: UpcomingPayment[] = rawExpenses
    .filter((exp) => exp.status === "Pending")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((exp) => {
      const isOverdue = new Date(exp.date).getTime() < new Date().getTime();
      return {
        id: exp.id,
        vendor: exp.vendor || exp.title,
        description: exp.title,
        amount: exp.amount,
        dueDate: exp.date.split("T")[0],
        status: isOverdue ? "overdue" : "pending",
      };
    });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance Dashboard"
        description="Track wedding budgets and expenses"
      />

      <DashboardSummary metrics={summaryMetrics} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ExpenseTrendChart data={expenseTrendData} />
        <BudgetDistributionChart data={dashboardCategories} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BudgetCategoryProgress data={dashboardCategories} />
        <RecentExpenses data={recentExpenses} />
      </div>

      <UpcomingPayments data={upcomingPayments} />
    </div>
  );
};

export default FinanceDashboardPage;