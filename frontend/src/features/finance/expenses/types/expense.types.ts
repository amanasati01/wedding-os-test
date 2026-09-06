export type ExpenseStatus =
  | "Paid"
  | "Pending";

export type Expense = {
  id: string;
  title: string;
  categoryId: string;
  vendor: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending";
};