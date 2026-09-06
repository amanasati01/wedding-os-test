import api from "@/lib/api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { BudgetCategory } from "../types/category.types";

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

// Map backend 'allocatedAmount' to frontend 'allocated', and mock 'spent' to 0 for now.
const mapToFrontend = (category: unknown): BudgetCategory => {
  const cat = category as Record<string, unknown>;
  return {
    ...cat,
    allocated: Number(cat.allocatedAmount),
    spent: 0,
  } as BudgetCategory;
};

// Map frontend 'allocated' to backend 'allocatedAmount'.
const mapToBackend = (data: Partial<BudgetCategory>): Record<string, unknown> => {
  const { allocated, ...rest } = data;
  return {
    ...rest,
    ...(allocated !== undefined ? { allocatedAmount: allocated } : {}),
  };
};

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<BudgetCategory[]> {
  const weddingId = getWeddingId();
  const response = await api.get<ApiResponse<unknown[]>>(`/categories/${weddingId}`);
  return response.data.data.map(mapToFrontend);
}

/**
 * Fetch a single category by ID
 */
export async function getCategoryById(id: string): Promise<BudgetCategory> {
  const weddingId = getWeddingId();
  const response = await api.get<ApiResponse<unknown>>(`/categories/${weddingId}/${id}`);
  return mapToFrontend(response.data.data);
}

/**
 * Create a new category
 */
export async function createCategory(data: Partial<BudgetCategory>): Promise<BudgetCategory> {
  const weddingId = getWeddingId();
  const payload = mapToBackend(data);
  const response = await api.post<ApiResponse<unknown>>(`/categories/${weddingId}`, payload);
  return mapToFrontend(response.data.data);
}

/**
 * Update an existing category
 */
export async function updateCategory(id: string, data: Partial<BudgetCategory>): Promise<BudgetCategory> {
  const weddingId = getWeddingId();
  const payload = mapToBackend(data);
  const response = await api.patch<ApiResponse<unknown>>(`/categories/${weddingId}/${id}`, payload);
  return mapToFrontend(response.data.data);
}

/**
 * Delete a category
 */
export async function deleteCategory(id: string): Promise<BudgetCategory> {
  const weddingId = getWeddingId();
  const response = await api.delete<ApiResponse<unknown>>(`/categories/${weddingId}/${id}`);
  return mapToFrontend(response.data.data);
}
