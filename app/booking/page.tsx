"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Phone,
  Check,
  X,
  MoreHorizontal,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react"

export default function BookingManagement() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")

  const bookings = [
    {
      id: 1,
      customer: {
        name: "Sukino",
        phone: "+62 812-3456-7890",
        email: "sukino@gmail.com",
        avatar: "/placeholder-user.jpg",
      },
      service: "Hair Cut Classic",
      staff: "Maya",
      date: "2024-01-20",
      time: "09:00",
      duration: 30,
      price: 75000,
      status: "pending",
      notes: "Minta potongan layer",
      createdAt: "2024-01-19 14:30",
    },
    {
      id: 2,
      customer: {
        name: "Sumarno",
        phone: "+62 813-4567-8901",
        email: "sumarno@gmail.com",
        avatar: "/placeholder-user.jpg",
      },
      service: "Beard Trim & Shape",
      staff: "Alex",
      date: "2024-01-20",
      time: "10:30",
      duration: 20,
      price: 35000,
      status: "confirmed",
      notes: "",
      createdAt: "2024-01-19 16:45",
    },
    {
      id: 3,
      customer: {
        name: "Sumirah",
        phone: "+62 814-5678-9012",
        email: "sumirah@gmail.com",
        avatar: "/placeholder-user.jpg",
      },
      service: "Hair Color Premium",
      staff: "Lisa",
      date: "2024-01-20",
      time: "14:00",
      duration: 120,
      price: 300000,
      status: "confirmed",
      notes: "Warna coklat muda",
      createdAt: "2024-01-18 10:20",
    },
    {
      id: 4,
      customer: {
        name: "Dewi Persik",
        phone: "+62 815-6789-0123",
        email: "dewi.persik@gmail.com",
        avatar: "/placeholder-user.jpg",
      },
      service: "Facial Deep Cleansing",
      staff: "Maya",
      date: "2024-01-19",
      time: "11:00",
      duration: 60,
      price: 150000,
      status: "completed",
      notes: "",
      createdAt: "2024-01-18 09:15",
    },
    {
      id: 5,
      customer: {
        name: "Nona Ambon",
        phone: "+62 816-7890-1234",
        email: "nona.ambon@gmail.com",
        avatar: "/placeholder-user.jpg",
      },
      service: "Hair Wash & Blow Dry",
      staff: "Alex",
      date: "2024-01-19",
      time: "15:30",
      duration: 45,
      price: 50000,
      status: "cancelled",
      notes: "Dibatalkan customer",
      createdAt: "2024-01-19 08:00",
    },
  ]

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = selectedStatus === "all" || booking.status === selectedStatus
    const today = new Date().toISOString().split("T")[0]
    const matchesDate =
      selectedDate === "all" ||
      (selectedDate === "today" && booking.date === today) ||
      (selectedDate === "upcoming" && booking.date >= today)

    return matchesStatus && matchesDate
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-500 text-white">
            <Hourglass className="h-3 w-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "confirmed":
        return (
          <Badge className="bg-blue-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Dikonfirmasi
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-emerald-500 text-white">
            <Check className="h-3 w-3 mr-1" />
            Selesai
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-500 text-white">
            <XCircle className="h-3 w-3 mr-1" />
            Dibatalkan
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 ? `${hours}j ${remainingMinutes}m` : `${hours} jam`
    }
    return `${minutes} menit`
  }

  const handleApprove = (bookingId: number) => {
    console.log("Approve booking:", bookingId)
    // Implement approval logic
  }

  const handleReject = (bookingId: number) => {
    console.log("Reject booking:", bookingId)
    // Implement rejection logic
  }

  const pendingCount = bookings.filter((b) => b.status === "pending").length
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length
  const completedCount = bookings.filter((b) => b.status === "completed").length
  const totalRevenue = bookings.filter((b) => b.status === "completed").reduce((sum, booking) => sum + booking.price, 0)

  return (
    <Layout breadcrumb={["ezenda", "booking"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manajemen Booking</h1>
            <p className="text-muted-foreground">Kelola booking dan konfirmasi jadwal layanan</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Menunggu Konfirmasi</p>
                  <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Dikonfirmasi</p>
                  <p className="text-2xl font-bold text-foreground">{confirmedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Selesai Hari Ini</p>
                  <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Hari Ini</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Bookings Alert */}
        {pendingCount > 0 && (
          <Card className="border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-200 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Booking Menunggu Konfirmasi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 dark:text-orange-300 text-sm">
                Ada {pendingCount} booking yang menunggu konfirmasi Anda. Segera konfirmasi untuk memberikan kepastian
                kepada pelanggan.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Filters and Booking List */}
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Daftar Booking</CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-40 bg-background border-border text-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all" className="text-foreground hover:bg-accent">
                      Semua Tanggal
                    </SelectItem>
                    <SelectItem value="today" className="text-foreground hover:bg-accent">
                      Hari Ini
                    </SelectItem>
                    <SelectItem value="upcoming" className="text-foreground hover:bg-accent">
                      Mendatang
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48 bg-background border-border text-foreground">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all" className="text-foreground hover:bg-accent">
                      Semua Status
                    </SelectItem>
                    <SelectItem value="pending" className="text-foreground hover:bg-accent">
                      Menunggu
                    </SelectItem>
                    <SelectItem value="confirmed" className="text-foreground hover:bg-accent">
                      Dikonfirmasi
                    </SelectItem>
                    <SelectItem value="completed" className="text-foreground hover:bg-accent">
                      Selesai
                    </SelectItem>
                    <SelectItem value="cancelled" className="text-foreground hover:bg-accent">
                      Dibatalkan
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Pelanggan</TableHead>
                  <TableHead className="text-muted-foreground">Layanan</TableHead>
                  <TableHead className="text-muted-foreground">Staf</TableHead>
                  <TableHead className="text-muted-foreground">Jadwal</TableHead>
                  <TableHead className="text-muted-foreground">Harga</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="border-border hover:bg-accent">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={booking.customer.avatar || "/placeholder.svg"}
                            alt={booking.customer.name}
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {booking.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{booking.customer.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{booking.customer.phone}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{booking.service}</p>
                        <p className="text-sm text-muted-foreground">{formatDuration(booking.duration)}</p>
                        {booking.notes && <p className="text-xs text-muted-foreground italic">"{booking.notes}"</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-foreground">
                        {booking.staff}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">
                              {new Date(booking.date).toLocaleDateString("id-ID")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">{booking.time}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{formatCurrency(booking.price)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(booking.status)}
                        {getStatusBadge(booking.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {booking.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(booking.id)}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(booking.id)}
                              className="border-red-500 text-red-500 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border-border">
                            <DropdownMenuItem className="text-foreground hover:bg-accent">
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground hover:bg-accent">
                              Hubungi Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground hover:bg-accent">Reschedule</DropdownMenuItem>
                            {booking.status !== "cancelled" && (
                              <DropdownMenuItem className="text-red-600 hover:bg-accent">Batalkan</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
