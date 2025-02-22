import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuth = request.cookies.has("auth-token")

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register"]

  // If the path is public and user is authenticated, redirect to home
  if (publicPaths.includes(pathname) && isAuth) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the path is not public and user is not authenticated, redirect to login
  if (!publicPaths.includes(pathname) && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

