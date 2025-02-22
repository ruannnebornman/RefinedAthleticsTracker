"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart3, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Reports",
      href: "/reports",
    },
  ]

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="font-bold">
            Refined Athletics Tracker
          </Link>
          {user && (
            <nav className="hidden md:flex gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.href === "/reports" && <BarChart3 className="w-4 h-4 mr-1" />}
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link className="w-full" href="/profile">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

