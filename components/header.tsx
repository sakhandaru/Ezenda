"use client"

import { Bell, Moon, Sun, ChevronLeft } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Logo from "./logo"

interface HeaderProps {
  breadcrumb?: string[]
  showBackButton?: boolean
}

export function Header({ breadcrumb = ["ezenda", "dashboard"], showBackButton = false }: HeaderProps) {
  const { setTheme, theme } = useTheme()
  const router = useRouter()

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-background border-b border-border">
      {/* Left side - Logo and Breadcrumb */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-foreground font-semibold text-lg">Ezenda</span>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm ml-4">
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className={index === breadcrumb.length - 1 ? "text-foreground font-medium" : "text-muted-foreground"}
              >
                {item}
              </span>
              {index < breadcrumb.length - 1 && <span className="text-muted-foreground">&gt;</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="text-muted-foreground hover:text-foreground"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Dara Daru</p>
                <p className="text-xs text-muted-foreground">daradaru@gmail.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
