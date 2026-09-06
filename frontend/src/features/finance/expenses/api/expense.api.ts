import api from "@/lib/api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { Expense } from "../types/expense.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Helper to get active wedding ID
const getWeddingId = () => {
  const user = useAuthStore.getState().user;
  if (!user || user.memberships.length === 0) {
    throw new Error("No active wedding found for user");
  }
  return user.memberships[0].weddingId;
};

// Map backend Expense to frontend Expense
const mapToFrontend = (expense: unknown): Expense => {
  const exp = expense as Record<string, unknown>;
  return {
    id: String(exp.id),
    title: String(exp.title),
    categoryId: String(exp.budgetCategoryId),
    vendor: exp.notes ? String(exp.notes) : "",
    amount: Number(exp.amount),
    date: String(exp.expenseDate),
    status: exp.status === "PAID" ? "Paid" : "Pending",
  };
};

// Map frontend Expense to backend Expense
const mapToBackend = (data: Partial<Expense>): Record<string, unknown> => {
  const { categoryId, vendor, date, status, ...rest } = data;
  return {
    ...rest,
    ...(categoryId !== undefined ? { budgetCategoryId: categoryId } : {}),
    ...(vendor !== undefined ? { notes: vendor } : {}),
    ...(date !== undefined ? { expenseDate: new Date(date).toISOString() } : {}),
    ...(status !== undefined ? { status: status.toUpperCase() } : {}),
  };
};

/**
 * Fetch all expenses
 */
export async function getExpenses(): Promise<Expense[]> {
  const weddingId = getWeddingId();
  const response = await api.get<ApiResponse<unknown[]>>(`/expenses/${weddingId}`);
  return response.data.data.map(mapToFrontend);
}

/**
 * Fetch a single expense by ID
 */
export async function getExpenseById(id: string): Promise<Expense> {
  const weddingId = getWeddingId();
  const response = await api.get<ApiResponse<unknown>>(`/expenses/${weddingId}/${id}`);
  return mapToFrontend(response.data.data);
}

/**
 * Create a new expense
 */
export async function createExpense(data: Partial<Expense>): Promise<Expense> {
  const weddingId = getWeddingId();
  const payload = mapToBackend(data);
  const response = await api.post<ApiResponse<unknown>>(`/expenses/${weddingId}`, payload);
  return mapToFrontend(response.data.data);
}

/**
 * Update an existing expense
 */
export async function updateExpense(id: string, data: Partial<Expense>): Promise<Expense> {
  const weddingId = getWeddingId();
  const payload = mapToBackend(data);
  const response = await api.patch<ApiResponse<unknown>>(`/expenses/${weddingId}/${id}`, payload);
  return mapToFrontend(response.data.data);
}

/**
 * Delete an expense
 */
export async function deleteExpense(id: string): Promise<Expense> {
  const weddingId = getWeddingId();
  const response = await api.delete<ApiResponse<unknown>>(`/expenses/${weddingId}/${id}`);
  return mapToFrontend(response.data.data);
}
