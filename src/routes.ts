/**
 * An array of routes accessible to all
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/title-case",
  "/research",
  "/citation",
  "/api/vectorize",
]

/**
 * An array of routes used for authentication
 * These routes redirect logged-in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/register",
  "/auth/login",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"
