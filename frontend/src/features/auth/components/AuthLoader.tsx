import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Heart } from "lucide-react";

interface AuthLoaderProps {
  children: React.ReactNode;
}

/**
 * Bootstrap component that runs on app load.
 * Checks for a persisted token in localStorage and restores the session
 * by calling GET /auth/me.
 *
 * Shows a branded loading screen while the session is being verified.
 */
export function AuthLoader({ children }: AuthLoaderProps) {
  const { token, fetchCurrentUser } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      if (token) {
        await fetchCurrentUser();
      }
      setIsInitialized(true);
    }

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 animate-pulse text-pink-500 fill-pink-500" />
          <span className="text-2xl font-bold tracking-tight">WeddingOS</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading your workspace...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
