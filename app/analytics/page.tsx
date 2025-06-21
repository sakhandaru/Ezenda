"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Clock, Download, Filter, BarChart3 } from "lucide-react"

export default function Analytics() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "Rp 45.2M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      title: "Total Bookings",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "New Customers",
      value: "89",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Avg. Service Time",
      value: "45 min",
      change: "+5.3%",
      trend: "up",
      icon: Clock,
      color: "text-orange-500",
    },
  ]

  const topServices = [
    { name: "Hair Cut", bookings: 324, revenue: "Rp 24.3M", growth: 12.5 },
    { name: "Hair Color", bookings: 156, revenue: "Rp 46.8M", growth: 8.7 },
    { name: "Facial Treatment", bookings: 89, revenue: "Rp 13.4M", growth: -2.1 },
    { name: "Beard Trim", bookings: 234, revenue: "Rp 8.2M", growth: 15.3 },
  ]

  const staffPerformance = [
    { name: "Maya", bookings: 89, revenue: "Rp 12.5M", rating: 4.9, efficiency: 95 },
    { name: "Alex", bookings: 76, revenue: "Rp 8.7M", rating: 4.8, efficiency: 88 },
    { name: "Lisa", bookings: 92, revenue: "Rp 15.2M", rating: 4.9, efficiency: 92 },
    { name: "Doni", bookings: 45, revenue: "Rp 6.8M", rating: 4.6, efficiency: 78 },
  ]

  return (
    <Layout breadcrumb={["ezenda", "analytics"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-muted-foreground">Analisis performa bisnis dan insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40 bg-background border-border text-foreground">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="7days" className="text-foreground hover:bg-accent">
                  7 Hari
                </SelectItem>
                <SelectItem value="30days" className="text-foreground hover:bg-accent">
                  30 Hari
                </SelectItem>
                <SelectItem value="90days" className="text-foreground hover:bg-accent">
                  90 Hari
                </SelectItem>
                <SelectItem value="1year" className="text-foreground hover:bg-accent">
                  1 Tahun
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${metric.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-accent`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Services */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Layanan Terpopuler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-accent rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">{service.name}</h3>
                      <Badge
                        variant={service.growth > 0 ? "default" : "secondary"}
                        className={service.growth > 0 ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}
                      >
                        {service.growth > 0 ? "+" : ""}
                        {service.growth}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{service.bookings} bookings</span>
                      <span className="font-medium text-foreground">{service.revenue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Staff Performance */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Performa Staf</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {staffPerformance.map((staff, index) => (
                <div key={index} className="p-3 bg-accent rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{staff.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        ⭐ {staff.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bookings: {staff.bookings}</span>
                      <span className="font-medium text-foreground">{staff.revenue}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Efficiency</span>
                        <span className="text-foreground">{staff.efficiency}%</span>
                      </div>
                      <Progress value={staff.efficiency} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-accent rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Chart akan ditampilkan di sini</p>
                <p className="text-sm text-muted-foreground">Integrasi dengan library chart seperti Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
