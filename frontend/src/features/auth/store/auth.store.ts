import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types/auth.types";
import { loginApi, getCurrentUser } from "../api/auth.api";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // ─── State ──────────────────────────────────────────────────────
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // ─── Actions ────────────────────────────────────────────────────

      login: async (userId: string, password: string) => {
        set({ isLoading: true });

        try {
          const { token, user } = await loginApi({ userId, password });

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({ isLoading: false });
          throw new Error("Invalid credentials");
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      fetchCurrentUser: async () => {
        const { token } = get();

        if (!token) {
          set({ isAuthenticated: false, isLoading: false });
          return;
        }

        set({ isLoading: true });

        try {
          const user = await getCurrentUser();

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          // Token is invalid or expired — clean up
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage",
      // Only persist the token — user is rehydrated from /auth/me on load
      partialize: (state) => ({ token: state.token }),
    }
  )
);
