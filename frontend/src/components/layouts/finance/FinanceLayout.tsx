import { Outlet, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", path: "/finance/dashboard" },
  { name: "Categories", path: "/finance/categories" },
  { name: "Expenses", path: "/finance/expenses" },
  { name: "Analytics", path: "/finance/analytics" },
  { name: "Reports", path: "/finance/reports" },
];

export default function FinanceLayout() {
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {/* Sub-navigation Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 items-center px-4 overflow-x-auto">
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-center px-4 py-1.5 text-sm font-medium transition-all rounded-md select-none",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
