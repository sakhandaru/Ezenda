"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Send,
  ArrowUp,
  MoreHorizontal,
  ShoppingCart,
  CreditCard,
  CalendarDays,
  Package,
} from "lucide-react"

export default function Dashboard() {
  const accounts = [
    {
      id: 1,
      name: "Pendapatan Harian",
      description: "Transaksi hari ini",
      amount: "Rp 2.450.000",
      icon: DollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      id: 2,
      name: "Booking Aktif",
      description: "Sedang berlangsung",
      amount: "24",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 3,
      name: "Staf Online",
      description: "Dari 5 total staf",
      amount: "3",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 4,
      name: "Produk Terjual",
      description: "Penjualan tambahan",
      amount: "12",
      icon: ShoppingCart,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "purchase",
      title: "Hair Treatment Package",
      subtitle: "Today, 2:45 PM",
      amount: "-Rp 350.000",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      id: 2,
      type: "deposit",
      title: "Pembayaran Booking",
      subtitle: "Today, 9:00 AM",
      amount: "+Rp 150.000",
      trend: "down",
      icon: CreditCard,
    },
    {
      id: 3,
      type: "subscription",
      title: "Membership Premium",
      subtitle: "Yesterday",
      amount: "-Rp 99.000",
      trend: "up",
      icon: CreditCard,
    },
    {
      id: 4,
      type: "purchase",
      title: "Product Sales",
      subtitle: "Today, 2:45 PM",
      amount: "-Rp 75.000",
      trend: "up",
      icon: ShoppingCart,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Target Bulanan",
      description: "3 minggu tersisa bulan ini",
      progress: 65,
      status: "In-progress",
      statusColor: "text-blue-500",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "Stok Produk",
      description: "Restock produk perawatan",
      progress: 30,
      status: "Pending",
      statusColor: "text-orange-500",
      icon: Package,
    },
    {
      id: 3,
      title: "Training Staf",
      description: "Program pelatihan bulanan",
      progress: 45,
      status: "In-progress",
      statusColor: "text-blue-500",
      icon: Users,
    },
  ]

  return (
    <Layout breadcrumb={["ezenda", "dashboard"]}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Total Balance */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <h1 className="text-4xl font-bold text-foreground">Rp 26.540.000</h1>
          </div>

          {/* Accounts */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Your Accounts</h2>
            <div className="space-y-3">
              {accounts.map((account) => (
                <Card key={account.id} className="border border-border hover:shadow-sm transition-shadow">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${account.bgColor}`}>
                        <account.icon className={`h-5 w-5 ${account.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.description}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">{account.amount}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1" variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
            <Button className="flex-1" variant="outline">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
            <Button className="flex-1" variant="outline">
              <ArrowUp className="h-4 w-4 mr-2" />
              Top-up
            </Button>
            <Button className="flex-1" variant="outline">
              <MoreHorizontal className="h-4 w-4 mr-2" />
              More
            </Button>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-foreground" />
              <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="border border-border">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <event.icon className="h-5 w-5 text-muted-foreground" />
                      <Badge variant="secondary" className={event.statusColor}>
                        {event.status}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{event.progress}%</span>
                      </div>
                      <Progress value={event.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Recent Activity */}
        <div className="space-y-6">
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">(23 transactions)</span>
                  <Badge variant="secondary" className="text-xs">
                    This Month
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <activity.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span
                      className={`font-medium text-sm ${
                        activity.amount.startsWith("+") ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {activity.amount}
                    </span>
                    {activity.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-red-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-emerald-500" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full">
            View All Transactions
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  )
}
