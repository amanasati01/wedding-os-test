import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BudgetCategory } from "../types/dashboard.types";

type BudgetCategoryProgressProps = {
  data: BudgetCategory[];
};

const BudgetCategoryProgress = ({ data }: BudgetCategoryProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget by Category</CardTitle>
        <CardDescription>
          Spending progress across all categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {data.map((item) => {
            const percentage = Math.min(
              Math.round((item.spent / item.allocated) * 100),
              100
            );
            const isOverBudget = item.spent > item.allocated;

            return (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ₹{item.spent.toLocaleString("en-IN")} / ₹
                    {item.allocated.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: isOverBudget
                        ? "hsl(var(--destructive))"
                        : item.color,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{percentage}% used</span>
                  <span>
                    ₹
                    {Math.max(
                      item.allocated - item.spent,
                      0
                    ).toLocaleString("en-IN")}{" "}
                    remaining
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCategoryProgress;
