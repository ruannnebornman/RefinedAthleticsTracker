import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// For static export, we'll handle auth client-side only
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}

