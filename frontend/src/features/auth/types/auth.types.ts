// ─── Role Enum ──────────────────────────────────────────────────────────────
export type Role = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

// ─── Wedding (minimal, as returned in memberships) ──────────────────────────
export interface WeddingSummary {
  id: string;
  weddingName: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
}

// ─── WeddingMember (per-wedding role assignment) ────────────────────────────
export interface WeddingMember {
  id: string;
  weddingId: string;
  userId: string;
  role: Role;
  invitedBy: string | null;
  createdAt: string;
  wedding: WeddingSummary;
}

// ─── User ───────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  memberships: WeddingMember[];
}

// ─── API Request/Response types ─────────────────────────────────────────────
export interface LoginRequest {
  userId: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginResponseData {
  token: string;
  user: User;
}

// ─── Auth Store State ───────────────────────────────────────────────────────
export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (userId: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}
