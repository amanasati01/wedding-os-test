import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import {
  getTopSpendingCategories,
  formatINR,
} from "../helpers/analytics.helpers";

type TopSpendingCategoriesProps = {
  categories: BudgetCategory[];
};

const TopSpendingCategories = ({ categories }: TopSpendingCategoriesProps) => {
  const data = getTopSpendingCategories(categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Spending Categories</CardTitle>
        <CardDescription>
          Categories ranked by spending amount
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Allocated</TableHead>
              <TableHead className="text-right">Spent</TableHead>
              <TableHead className="text-right">Remaining</TableHead>
              <TableHead className="w-40">Utilization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((category) => {
              const isOverBudget = category.remaining < 0;

              return (
                <TableRow key={category.id}>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    #{category.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className="block h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatINR(category.allocated)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatINR(category.spent)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-mono text-sm ${
                      isOverBudget
                        ? "text-destructive font-semibold"
                        : "text-emerald-500"
                    }`}
                  >
                    {isOverBudget ? "-" : ""}
                    {formatINR(Math.abs(category.remaining))}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress
                        value={Math.min(category.utilization, 100)}
                        className="h-2"
                        style={
                          {
                            "--progress-color": isOverBudget
                              ? "var(--destructive)"
                              : category.color,
                          } as React.CSSProperties
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {category.utilization}% used
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopSpendingCategories;
