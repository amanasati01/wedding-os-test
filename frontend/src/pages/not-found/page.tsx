import { Link, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeartCrack } from "lucide-react";

export default function NotFoundPage() {
  const error = useRouteError() as { status?: number; statusText?: string; message?: string };

  const is404 = error?.status === 404;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted/50 border shadow-sm">
          <HeartCrack className="h-12 w-12 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {is404 ? "Page Not Found" : "Oops! Something went wrong."}
          </h1>
          <p className="text-muted-foreground text-lg">
            {is404 
              ? "We couldn't find the page you were looking for. It might have been moved or doesn't exist." 
              : error?.statusText || error?.message || "An unexpected application error occurred."}
          </p>
        </div>

        <div className="pt-4 flex gap-4">
          <Button asChild variant="default" size="lg">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
