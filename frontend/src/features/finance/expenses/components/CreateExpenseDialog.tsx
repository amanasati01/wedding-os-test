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

type CreateExpenseDialogProps = {
  onCreate: (expense: Expense) => void;
  categories: BudgetCategory[];
};

export default function CreateExpenseDialog({
  onCreate,
  categories,
}: CreateExpenseDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      vendor: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    },
  });

  const onSubmit = (data: ExpenseFormValues) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      title: data.title,
      categoryId: data.categoryId,
      vendor: data.vendor,
      amount: data.amount,
      date: data.date,
      status: data.status,
    };
    onCreate(newExpense);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Expense</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Expense</DialogTitle>
          <DialogDescription>
            Add a new expense for your wedding.
          </DialogDescription>
        </DialogHeader>

        <ExpenseForm
          form={form}
          onSubmit={onSubmit}
          submitLabel="Create Expense"
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
}
