import type { Expense } from "../types/expense.types";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CreateExpenseDialog from "./CreateExpenseDialog";
import EditExpenseDialog from "./EditExpenseDialog";
import DeleteExpenseDialog from "./DeleteExpenseDialog";

type ExpenseTableProps = {
  expenses: Expense[];
  categories: BudgetCategory[];
  onCreate: (expense: Expense) => void;
  onEdit: (updated: Expense) => void;
  onDelete: (id: string) => void;
};

function ExpenseTable({
  expenses,
  categories,
  onCreate,
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Expenses</CardTitle>
        <CreateExpenseDialog onCreate={onCreate} categories={categories} />
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.title}</TableCell>
                
                <TableCell>{getCategoryName(expense.categoryId)}</TableCell>

                <TableCell>{expense.vendor}</TableCell>

                <TableCell className="text-right">
                  ₹{expense.amount.toLocaleString("en-IN")}
                </TableCell>

                <TableCell>{expense.date}</TableCell>

                <TableCell>
                  <Badge
                    variant={expense.status === "Paid" ? "default" : "secondary"}
                    className={
                      expense.status === "Paid"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-amber-500 hover:bg-amber-600"
                    }
                  >
                    {expense.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <EditExpenseDialog
                      expense={expense}
                      onEdit={onEdit}
                      categories={categories}
                    />
                    <DeleteExpenseDialog
                      expense={expense}
                      onDelete={onDelete}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No expenses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ExpenseTable;