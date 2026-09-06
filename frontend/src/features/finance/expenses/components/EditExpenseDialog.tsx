import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ExpenseForm from "./ExpenseForm";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "../schemas/expense.schema";
import type { Expense } from "../types/expense.types";
import type { BudgetCategory } from "@/features/finance/categories/types/category.types";
import { Pencil } from "lucide-react";

type EditExpenseDialogProps = {
  expense: Expense;
  onEdit: (updated: Expense) => void;
  categories: BudgetCategory[];
};

export default function EditExpenseDialog({
  expense,
  onEdit,
  categories,
}: EditExpenseDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: expense.title,
      categoryId: expense.categoryId,
      vendor: expense.vendor,
      amount: expense.amount,
      date: expense.date,
      status: expense.status,
    },
  });

  const onSubmit = (data: ExpenseFormValues) => {
    const updated: Expense = {
      ...expense,
      title: data.title,
      categoryId: data.categoryId,
      vendor: data.vendor,
      amount: data.amount,
      date: data.date,
      status: data.status,
    };
    onEdit(updated);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      form.reset({
        title: expense.title,
        categoryId: expense.categoryId,
        vendor: expense.vendor,
        amount: expense.amount,
        date: expense.date,
        status: expense.status,
      });
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit {expense.title}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Update the expense details for <strong>{expense.title}</strong>.
          </DialogDescription>
        </DialogHeader>

        <ExpenseForm
          form={form}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
}
