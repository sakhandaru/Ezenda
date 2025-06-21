"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Phone, Mail, Calendar, User } from "lucide-react"

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("")

  const customers = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+62 812-3456-7890",
      email: "sarah@example.com",
      totalBookings: 12,
      lastBooking: "2024-01-15",
      status: "active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 2,
      name: "John Smith",
      phone: "+62 813-4567-8901",
      email: "john@example.com",
      totalBookings: 8,
      lastBooking: "2024-01-10",
      status: "active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 3,
      name: "Emma Wilson",
      phone: "+62 814-5678-9012",
      email: "emma@example.com",
      totalBookings: 15,
      lastBooking: "2024-01-12",
      status: "vip",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 4,
      name: "Mike Brown",
      phone: "+62 815-6789-0123",
      email: "mike@example.com",
      totalBookings: 3,
      lastBooking: "2023-12-20",
      status: "inactive",
      avatar: "/placeholder-user.jpg",
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500 text-white">Aktif</Badge>
      case "vip":
        return <Badge className="bg-purple-500 text-white">VIP</Badge>
      case "inactive":
        return (
          <Badge variant="secondary" className="text-muted-foreground">
            Tidak Aktif
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Layout breadcrumb={["ezenda", "pelanggan"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pelanggan</h1>
            <p className="text-muted-foreground">Kelola data pelanggan dan riwayat booking</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pelanggan
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Pelanggan</p>
                  <p className="text-2xl font-bold text-foreground">248</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Pelanggan Aktif</p>
                  <p className="text-2xl font-bold text-foreground">186</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Pelanggan VIP</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Booking Bulan Ini</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Daftar Pelanggan</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Cari pelanggan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Pelanggan</TableHead>
                  <TableHead className="text-muted-foreground">Kontak</TableHead>
                  <TableHead className="text-muted-foreground">Total Booking</TableHead>
                  <TableHead className="text-muted-foreground">Terakhir Booking</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="border-border hover:bg-accent">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ID: #{customer.id.toString().padStart(4, "0")}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-foreground">{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-foreground">{customer.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{customer.totalBookings}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground">
                        {new Date(customer.lastBooking).toLocaleDateString("id-ID")}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border-border">
                          <DropdownMenuItem className="text-foreground hover:bg-accent">Lihat Detail</DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-accent">
                            Edit Pelanggan
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-accent">
                            Riwayat Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-accent">Hapus</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
