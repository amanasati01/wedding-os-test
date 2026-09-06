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
import { getCategoryReportData, formatINR } from "../helpers/reports.helpers";

type CategoryReportTableProps = {
  categories: BudgetCategory[];
};

const CategoryReportTable = ({ categories }: CategoryReportTableProps) => {
  const data = getCategoryReportData(categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Report</CardTitle>
        <CardDescription>
          Budget allocation and spending across all categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Allocated Budget</TableHead>
              <TableHead className="text-right">Spent</TableHead>
              <TableHead className="text-right">Remaining</TableHead>
              <TableHead className="w-44">Utilization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const isOverBudget = row.remaining < 0;

              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className="block h-3 w-3 rounded-full"
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="font-medium">{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatINR(row.allocated)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatINR(row.spent)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-mono text-sm ${
                      isOverBudget
                        ? "font-semibold text-destructive"
                        : "text-emerald-500"
                    }`}
                  >
                    {isOverBudget ? "-" : ""}
                    {formatINR(Math.abs(row.remaining))}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress
                        value={Math.min(row.utilization, 100)}
                        className="h-2"
                        style={
                          {
                            "--progress-color": isOverBudget
                              ? "var(--destructive)"
                              : row.color,
                          } as React.CSSProperties
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {row.utilization}%
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

export default CategoryReportTable;
