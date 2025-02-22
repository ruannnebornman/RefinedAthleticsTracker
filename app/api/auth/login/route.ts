import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Here you would validate credentials against your database
    // This is a mock implementation
    if (email === "test@example.com" && password === "password") {
      const user = {
        id: "1",
        email,
        name: "Test User",
      }

      // Set auth cookie
      cookies().set("auth-token", "mock-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 1 week
      })

      return NextResponse.json({ user })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

