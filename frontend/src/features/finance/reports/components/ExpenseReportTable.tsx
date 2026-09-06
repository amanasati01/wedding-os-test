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
import { Badge } from "@/components/ui/badge";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import type { Expense } from "@/features/finance/expenses/types/expense.types";
import {
  getExpenseReportData,
  formatINR,
  formatDate,
} from "../helpers/reports.helpers";

type ExpenseReportTableProps = {
  expenses: Expense[];
  categories: BudgetCategory[];
};

const ExpenseReportTable = ({
  expenses,
  categories,
}: ExpenseReportTableProps) => {
  const data = getExpenseReportData(expenses, categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Report</CardTitle>
        <CardDescription>
          All expenses sorted by most recent first
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expense</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: row.categoryColor }}
                    />
                    <span className="text-sm">{row.categoryName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {row.vendor}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {formatINR(row.amount)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(row.date)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={row.status === "Paid" ? "secondary" : "outline"}
                    className={
                      row.status === "Paid"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "border-amber-500/50 text-amber-500"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpenseReportTable;
