import { useAuthStore } from "../store/auth.store";
import type { Role } from "../types/auth.types";

/**
 * Convenience hook for accessing auth state and helpers.
 */
export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout, fetchCurrentUser } =
    useAuthStore();

  /**
   * Check if the current user has one of the specified roles
   * in any of their wedding memberships.
   */
  function hasRole(...roles: Role[]): boolean {
    if (!user?.memberships) return false;

    return user.memberships.some((m) => roles.includes(m.role));
  }

  /**
   * Check if the current user has one of the specified roles
   * for a specific wedding.
   */
  function hasRoleInWedding(weddingId: string, ...roles: Role[]): boolean {
    if (!user?.memberships) return false;

    return user.memberships.some(
      (m) => m.weddingId === weddingId && roles.includes(m.role)
    );
  }

  /**
   * Get the user's role in a specific wedding.
   */
  function getRoleInWedding(weddingId: string): Role | null {
    if (!user?.memberships) return null;

    const membership = user.memberships.find(
      (m) => m.weddingId === weddingId
    );

    return membership?.role ?? null;
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    fetchCurrentUser,
    hasRole,
    hasRoleInWedding,
    getRoleInWedding,
  };
}
