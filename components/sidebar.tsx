"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Users,
  ShoppingCart,
  Scissors,
  UserCheck,
  BarChart3,
  Settings,
  MessageSquare,
  HelpCircle,
  Package,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Logo from "./logo"

const sidebarSections = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "BUSINESS",
    items: [
      { name: "Booking", href: "/booking", icon: Calendar },
      { name: "Kalender", href: "/calendar", icon: CalendarDays },
      { name: "POS", href: "/pos", icon: ShoppingCart },
      { name: "Pelanggan", href: "/customers", icon: Users },
      { name: "Layanan", href: "/services", icon: Scissors },
      { name: "Inventori", href: "/inventory", icon: Package},
    ],
  },
  {
    title: "TEAM",
    items: [
      { name: "Staf", href: "/staff", icon: UserCheck },
      { name: "Chat", href: "/chat", icon: MessageSquare },
    ],
  },
]

const bottomItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
      "flex flex-col h-screen bg-background border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-3 border-b border-border">
      {!collapsed && (
        <div className="flex items-center space-x-2">
        <Logo height={24} width={24} />
        <span className="text-foreground font-semibold text-lg">Ezenda</span>
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="text-muted-foreground hover:text-foreground"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
      {sidebarSections.map((section) => (
        <div key={section.title} className="space-y-2">
        {!collapsed && (
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase px-2">
          {section.title}
          </h3>
        )}
        <div className="space-y-1">
          {section.items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
            <div
              className={cn(
              "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group",
              collapsed ? "justify-center" : "space-x-3",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </div>
            </Link>
          )
          })}
        </div>
        </div>
      ))}
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-border space-y-1">
      {bottomItems.map((item) => {
        const isActive = pathname === item.href
        return (
        <Link key={item.name} href={item.href}>
          <div
          className={cn(
            "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200",
            collapsed ? "justify-center" : "space-x-3",
            isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent",
          )}
          >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">{item.name}</span>}
          </div>
        </Link>
        )
      })}
      {!collapsed && (
        <div className="pt-4">
        <p className="text-xs text-muted-foreground px-2">ezenda.com</p>
        </div>
      )}
      </div>
    </div>
  )
}
