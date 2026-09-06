import { useAuth } from "../hooks/useAuth";
import type { Role } from "../types/auth.types";
import { ShieldX } from "lucide-react";

interface RoleGuardProps {
  roles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Role-based access control component.
 * Renders children only if the user has one of the allowed roles
 * in any of their wedding memberships.
 *
 * Usage:
 *   <RoleGuard roles={["OWNER", "ADMIN"]}>
 *     <FinancePage />
 *   </RoleGuard>
 */
export function RoleGuard({ roles, children, fallback }: RoleGuardProps) {
  const { hasRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  if (!hasRole(...roles)) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <ShieldX className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          Access Denied
        </h2>
        <p className="max-w-md text-muted-foreground">
          You don't have the required permissions to view this page.
          Contact your wedding workspace owner to request access.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
