"use client"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Users, Clock, DollarSign, Star, Phone, Mail } from "lucide-react"

export default function Staff() {
  const staffMembers = [
    {
      id: 1,
      name: "Maya Sari",
      role: "Senior Stylist",
      phone: "+62 812-3456-7890",
      email: "maya@ezenda.com",
      status: "active",
      avatar: "/placeholder-user.jpg",
      todayBookings: 8,
      monthlyRevenue: 12500000,
      rating: 4.9,
      experience: "5 tahun",
    },
    {
      id: 2,
      name: "Alex Rahman",
      role: "Barber",
      phone: "+62 813-4567-8901",
      email: "alex@ezenda.com",
      status: "active",
      avatar: "/placeholder-user.jpg",
      todayBookings: 6,
      monthlyRevenue: 8750000,
      rating: 4.8,
      experience: "3 tahun",
    },
    {
      id: 3,
      name: "Lisa Putri",
      role: "Colorist",
      phone: "+62 814-5678-9012",
      email: "lisa@ezenda.com",
      status: "break",
      avatar: "/placeholder-user.jpg",
      todayBookings: 4,
      monthlyRevenue: 15200000,
      rating: 4.9,
      experience: "7 tahun",
    },
    {
      id: 4,
      name: "Doni Pratama",
      role: "Junior Stylist",
      phone: "+62 815-6789-0123",
      email: "doni@ezenda.com",
      status: "active",
      avatar: "/placeholder-user.jpg",
      todayBookings: 5,
      monthlyRevenue: 6800000,
      rating: 4.6,
      experience: "1 tahun",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500 text-white">Aktif</Badge>
      case "break":
        return <Badge className="bg-orange-500 text-white">Istirahat</Badge>
      case "offline":
        return (
          <Badge variant="secondary" className="text-muted-foreground">
            Offline
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Layout breadcrumb={["ezenda", "staf"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manajemen Staf</h1>
            <p className="text-muted-foreground">Kelola tim dan performa staf</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Staf
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Staf</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Staf Aktif</p>
                  <p className="text-2xl font-bold text-foreground">9</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Jam Kerja Hari Ini</p>
                  <p className="text-2xl font-bold text-foreground">72</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Bulan Ini</p>
                  <p className="text-2xl font-bold text-foreground">43.2M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((staff) => (
            <Card key={staff.id} className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{staff.name}</h3>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background border-border">
                      <DropdownMenuItem className="text-foreground hover:bg-accent">Lihat Detail</DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:bg-accent">Edit Profil</DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:bg-accent">Jadwal Kerja</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 hover:bg-accent">Nonaktifkan</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(staff.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Booking Hari Ini</span>
                    <span className="font-medium text-foreground">{staff.todayBookings}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Revenue Bulan Ini</span>
                    <span className="font-medium text-foreground">{formatCurrency(staff.monthlyRevenue)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>Rating</span>
                    </span>
                    <span className="font-medium text-foreground">{staff.rating}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pengalaman</span>
                    <span className="font-medium text-foreground">{staff.experience}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{staff.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{staff.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target Bulanan</span>
                    <span className="font-medium text-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Staff Table */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Detail Performa Staf</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Staf</TableHead>
                  <TableHead className="text-muted-foreground">Role</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Booking Hari Ini</TableHead>
                  <TableHead className="text-muted-foreground">Revenue Bulan Ini</TableHead>
                  <TableHead className="text-muted-foreground">Rating</TableHead>
                  <TableHead className="text-muted-foreground">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffMembers.map((staff) => (
                  <TableRow key={staff.id} className="border-border hover:bg-accent">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.experience} pengalaman</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground">{staff.role}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(staff.status)}</TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{staff.todayBookings}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{formatCurrency(staff.monthlyRevenue)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="font-medium text-foreground">{staff.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border-border">
                          <DropdownMenuItem className="text-foreground hover:bg-accent">Lihat Detail</DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-accent">Edit Profil</DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-accent">Jadwal Kerja</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-accent">Nonaktifkan</DropdownMenuItem>
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
