import api from "@/lib/api";
import type {
  LoginRequest,
  LoginResponseData,
  ApiResponse,
  User,
} from "../types/auth.types";

/**
 * POST /auth/login
 */
export async function loginApi(data: LoginRequest): Promise<LoginResponseData> {
  const response = await api.post<ApiResponse<LoginResponseData>>(
    "/auth/login",
    data
  );
  return response.data.data;
}

/**
 * GET /auth/me
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<ApiResponse<User>>("/auth/me");
  return response.data.data;
}
