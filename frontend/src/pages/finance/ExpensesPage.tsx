import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ExpenseTable from "@/features/finance/expenses/components/ExpenseTable";
import { getCategories } from "@/features/finance/categories/api/category.api";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "@/features/finance/expenses/api/expense.api";
import PageHeader from "@/components/shared/PageHeader";
import type { Expense } from "@/features/finance/expenses/types/expense.types";

function ExpensesPage() {
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: expenses = [], isLoading: expensesLoading, isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const createMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense created successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to create expense");
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Expense> }) =>
      updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to update expense");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to delete expense");
    },
  });

  const handleCreate = (newExpense: Expense) => {
    createMutation.mutate(newExpense);
  };

  const handleEdit = (updatedExpense: Expense) => {
    editMutation.mutate({ id: updatedExpense.id, data: updatedExpense });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const isLoading = categoriesLoading || expensesLoading;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8 text-destructive">
        Failed to load expenses.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Track and manage wedding expenses"
      />
      <ExpenseTable
        expenses={expenses}
        categories={categories}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ExpensesPage;