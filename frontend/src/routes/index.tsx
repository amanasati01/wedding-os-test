import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Pages
import LandingPage from "@/pages/landing/page";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardPage from "@/pages/dashboard/page";
import LoginPage from "@/features/auth/pages/LoginPage";
import NotFoundPage from "@/pages/not-found/page";

import FinanceDashboardPage from "@/pages/finance/FinanceDashboardPage";
import BudgetCategoriesPage from "@/pages/finance/BudgetCategoriesPage";
import ExpensesPage from "@/pages/finance/ExpensesPage";
import AnalyticsPage from "@/pages/finance/AnalyticsPage";
import ReportsPage from "@/pages/finance/ReportsPage";

// Auth
import { ProtectedRoute, RoleGuard } from "@/features/auth";
import FinanceLayout from "@/components/layouts/finance/FinanceLayout";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "finance",
        element: (
          <RoleGuard roles={["OWNER", "ADMIN"]}>
            <FinanceLayout />
          </RoleGuard>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="/finance/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <FinanceDashboardPage />,
          },
          {
            path: "categories",
            element: <BudgetCategoriesPage />,
          },
          {
            path: "expenses",
            element: <ExpensesPage />,
          },
          {
            path: "reports",
            element: <ReportsPage />,
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,
          },
        ],
      },
      {
        path: "guests",
        element: (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Guests Module - Coming Soon
          </div>
        ),
      },
      {
        path: "events",
        element: (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Events Module - Coming Soon
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
