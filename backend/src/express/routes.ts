import { Router } from "express";
import type { Response } from "express";
import authRouter from "../modules/auth/auth.routes.js";
import userRouter from "../modules/users/user.routes.js";
import { authenticate, requireRole } from "../modules/auth/index.js";
import { APiResponse } from "../shared/ApiResponse.js";
import type { AuthenticatedRequest } from "../modules/auth/auth.types.js";

const router = Router();

// ─── Health Check ───────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "WeddingOs Api is running",
  });
});

// ─── Module Routes ──────────────────────────────────────────────────────────
import { categoryRouter } from "../modules/categories/category.routes.js";
import { expenseRouter } from "../modules/expenses/expense.routes.js";

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/expenses", expenseRouter);

// ─── Example Protected Finance Route ────────────────────────────────────────
// Only OWNER and ADMIN have finance access
router.get(
  "/weddings/:weddingId/finance",
  authenticate as any,
  requireRole("OWNER", "ADMIN") as any,
  ((req: AuthenticatedRequest, res: Response) => {
    res.status(200).json(
      new APiResponse(true, "Finance data access granted.", {
        weddingId: req.params["weddingId"],
        user: req.user.displayName,
      })
    );
  }) as any
);

export default router;