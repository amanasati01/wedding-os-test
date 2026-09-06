import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ExpenseItem } from "../types/dashboard.types";

type RecentExpensesProps = {
  data: ExpenseItem[];
};

const statusStyles: Record<ExpenseItem["status"], string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

const RecentExpenses = ({ data }: RecentExpensesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>Latest transactions for the wedding</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {expense.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {expense.category} · {expense.date}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[expense.status]}`}
                >
                  {expense.status}
                </span>
                <span className="text-sm font-semibold tabular-nums">
                  ₹{expense.amount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;