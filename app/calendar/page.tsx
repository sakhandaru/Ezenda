"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, Filter, Clock, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedStaff, setSelectedStaff] = useState("all")

  const staff = [
    { id: "maya", name: "Maya", color: "bg-blue-500" },
    { id: "alex", name: "Alex", color: "bg-emerald-500" },
    { id: "lisa", name: "Lisa", color: "bg-purple-500" },
  ]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ]

  const bookings = [
    {
      id: 1,
      staff: "maya",
      day: 1,
      time: "09:00",
      duration: 1,
      customer: "Sarah Johnson",
      service: "Hair Cut Classic",
      phone: "+62 812-3456-7890",
      status: "confirmed",
    },
    {
      id: 2,
      staff: "alex",
      day: 1,
      time: "10:30",
      duration: 1,
      customer: "John Smith",
      service: "Beard Trim & Shape",
      phone: "+62 813-4567-8901",
      status: "confirmed",
    },
    {
      id: 3,
      staff: "maya",
      day: 2,
      time: "14:00",
      duration: 4,
      customer: "Emma Wilson",
      service: "Hair Color Premium",
      phone: "+62 814-5678-9012",
      status: "confirmed",
    },
    {
      id: 4,
      staff: "lisa",
      day: 3,
      time: "11:00",
      duration: 2,
      customer: "Mike Brown",
      service: "Facial Deep Cleansing",
      phone: "+62 815-6789-0123",
      status: "pending",
    },
    {
      id: 5,
      staff: "alex",
      day: 4,
      time: "15:30",
      duration: 1,
      customer: "Lisa Chen",
      service: "Hair Wash & Blow Dry",
      phone: "+62 816-7890-1234",
      status: "pending",
    },
  ]

  const getWeekDays = () => {
    const days = []
    const startOfWeek = new Date(currentWeek)
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekDays = getWeekDays()

  const getBookingPosition = (time: string, duration: number) => {
    const timeIndex = timeSlots.indexOf(time)
    return {
      top: `${timeIndex * 60}px`,
      height: `${duration * 60 - 4}px`,
    }
  }

  const getStatusColor = (status: string, baseColor: string) => {
    if (status === "pending") {
      return baseColor.replace("bg-", "bg-opacity-50 bg-") + " border-2 border-orange-400"
    }
    return baseColor
  }

  const filteredBookings =
    selectedStaff === "all" ? bookings : bookings.filter((booking) => booking.staff === selectedStaff)

  return (
    <Layout breadcrumb={["ezenda", "kalender"]}>
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newWeek = new Date(currentWeek)
                  newWeek.setDate(currentWeek.getDate() - 7)
                  setCurrentWeek(newWeek)
                }}
                className="border-border text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold text-foreground">
                {weekDays[0].toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newWeek = new Date(currentWeek)
                  newWeek.setDate(currentWeek.getDate() + 7)
                  setCurrentWeek(newWeek)
                }}
                className="border-border text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
              <SelectTrigger className="w-48 bg-background border-border text-foreground">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="all" className="text-foreground hover:bg-accent">
                  Semua Staf
                </SelectItem>
                {staff.map((member) => (
                  <SelectItem key={member.id} value={member.id} className="text-foreground hover:bg-accent">
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Booking
          </Button>
        </div>

        {/* Staff Legend */}
        <div className="flex items-center space-x-6">
          {staff.map((member) => (
            <div key={member.id} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${member.color}`} />
              <span className="text-muted-foreground text-sm">{member.name}</span>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-400 border-2 border-orange-400" />
            <span className="text-muted-foreground text-sm">Menunggu Konfirmasi</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="border border-border">
          <CardContent className="p-0">
            <div className="grid grid-cols-8 border-b border-border">
              {/* Time column header */}
              <div className="p-4 border-r border-border">
                <span className="text-muted-foreground text-sm font-medium">Waktu</span>
              </div>

              {/* Day headers */}
              {weekDays.map((day, index) => (
                <div key={index} className="p-4 text-center border-r border-border last:border-r-0">
                  <div className="text-muted-foreground text-sm">
                    {day.toLocaleDateString("id-ID", { weekday: "short" })}
                  </div>
                  <div className="text-foreground font-semibold text-lg">{day.getDate()}</div>
                </div>
              ))}
            </div>

            {/* Calendar Body */}
            <div className="grid grid-cols-8 relative">
              {/* Time slots */}
              <div className="border-r border-border">
                {timeSlots.map((time, index) => (
                  <div key={time} className="h-[60px] p-2 border-b border-border flex items-center">
                    <span className="text-muted-foreground text-sm">{time}</span>
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="relative border-r border-border last:border-r-0">
                  {/* Time slot grid */}
                  {timeSlots.map((time, timeIndex) => (
                    <div key={time} className="h-[60px] border-b border-border hover:bg-accent cursor-pointer" />
                  ))}

                  {/* Bookings */}
                  {filteredBookings
                    .filter((booking) => booking.day === dayIndex + 1)
                    .map((booking) => {
                      const staffMember = staff.find((s) => s.id === booking.staff)
                      const position = getBookingPosition(booking.time, booking.duration)

                      return (
                        <div
                          key={booking.id}
                          className={`absolute left-1 right-1 rounded-lg p-2 cursor-pointer hover:opacity-90 transition-opacity ${getStatusColor(
                            booking.status,
                            staffMember?.color || "bg-gray-500",
                          )}`}
                          style={position}
                          title={`${booking.customer} - ${booking.service} (${booking.status})`}
                        >
                          <div className="text-white text-xs font-medium truncate">{booking.customer}</div>
                          <div className="text-white/80 text-xs truncate">{booking.service}</div>
                          <div className="text-white/60 text-xs flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {booking.time}
                          </div>
                          {booking.status === "pending" && (
                            <Badge className="bg-orange-500 text-white text-xs mt-1">Pending</Badge>
                          )}
                        </div>
                      )
                    })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Bookings */}
        {bookings.filter((b) => b.status === "pending").length > 0 && (
          <Card className="border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardContent className="p-4">
              <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">
                Booking Menunggu Konfirmasi ({bookings.filter((b) => b.status === "pending").length})
              </h3>
              <div className="space-y-2">
                {bookings
                  .filter((b) => b.status === "pending")
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-orange-700"
                    >
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{booking.customer}</p>
                          <p className="text-sm text-muted-foreground">{booking.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{booking.time}</p>
                          <p className="text-xs text-muted-foreground">Staf: {booking.staff}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                            Terima
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-500">
                            Tolak
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
