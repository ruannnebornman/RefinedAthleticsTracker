import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const authToken = cookies().get("auth-token")

  if (!authToken) {
    return NextResponse.json({ user: null })
  }

  // Here you would validate the token and fetch user data
  // This is a mock implementation
  const user = {
    id: "1",
    email: "test@example.com",
    name: "Test User",
  }

  return NextResponse.json({ user })
}

