import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  DollarSign,
  Menu,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { useAuth } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardLayout() {
  const { theme, setTheme } = useThemeStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  // Get user initials for avatar
  const initials = user?.displayName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "U";

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl tracking-tight text-primary">
              WeddingOS
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/dashboard"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>
            <Link
              to="/guests"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname.startsWith("/guests")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Users className="h-4 w-4" />
              Guests
            </Link>
            <Link
              to="/finance/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname.startsWith("/finance")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <DollarSign className="h-4 w-4" />
              Finance
            </Link>
            <Link
              to="/events"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname.startsWith("/events")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Calendar className="h-4 w-4" />
              Events
            </Link>
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate">
                {user?.displayName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.userId}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <div className="flex-1" />

          {/* Mobile user info */}
          <div className="flex items-center gap-2 md:hidden">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="sr-only">Toggle theme</span>
            {theme === "dark" ? "🌙" : "☀️"}
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
