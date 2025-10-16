import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/welcome",
    "/sign-in(.*)",
    "/sign-up(.*)"
  ]
});

export const config = {
  matcher: [
    // Skip static files and _next
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    // Include API routes if you want auth there too
    "/(api|trpc)(.*)",
  ],
};


