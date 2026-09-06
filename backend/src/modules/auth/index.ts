export { default as authRouter } from "./auth.routes.js";
export { authenticate, requireRole } from "./auth.middleware.js";
export type { AuthenticatedRequest } from "./auth.types.js";
