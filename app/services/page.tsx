"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Scissors,
  Clock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Users,
  Star,
  TrendingUp,
} from "lucide-react"

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)

  const categories = [
    { id: "hair", name: "Hair Services" },
    { id: "beard", name: "Beard & Mustache" },
    { id: "facial", name: "Facial Treatment" },
    { id: "massage", name: "Massage & Spa" },
    { id: "styling", name: "Hair Styling" },
  ]

  const services = [
    {
      id: 1,
      name: "Hair Cut Classic",
      category: "Hair Services",
      duration: 30,
      price: 75000,
      description: "Potongan rambut klasik dengan teknik profesional",
      staff: ["Maya", "Alex"],
      bookingsThisMonth: 89,
      rating: 4.8,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Beard Trim & Shape",
      category: "Beard & Mustache",
      duration: 20,
      price: 35000,
      description: "Perawatan dan pembentukan jenggot profesional",
      staff: ["Alex"],
      bookingsThisMonth: 67,
      rating: 4.9,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Hair Color Premium",
      category: "Hair Styling",
      duration: 120,
      price: 300000,
      description: "Pewarnaan rambut dengan produk premium berkualitas tinggi",
      staff: ["Lisa"],
      bookingsThisMonth: 34,
      rating: 4.7,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Facial Deep Cleansing",
      category: "Facial Treatment",
      duration: 60,
      price: 150000,
      description: "Perawatan wajah mendalam untuk kulit bersih dan sehat",
      staff: ["Maya", "Lisa"],
      bookingsThisMonth: 45,
      rating: 4.6,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Hair Wash & Blow Dry",
      category: "Hair Services",
      duration: 45,
      price: 50000,
      description: "Keramas dan blow dry dengan produk premium",
      staff: ["Maya", "Alex", "Lisa"],
      bookingsThisMonth: 123,
      rating: 4.5,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Relaxing Head Massage",
      category: "Massage & Spa",
      duration: 30,
      price: 80000,
      description: "Pijat kepala relaksasi untuk mengurangi stress",
      staff: ["Lisa"],
      bookingsThisMonth: 28,
      rating: 4.9,
      status: "inactive",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || service.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500 text-white">Aktif</Badge>
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

  const totalServices = services.length
  const activeServices = services.filter((s) => s.status === "active").length
  const totalBookings = services.reduce((sum, service) => sum + service.bookingsThisMonth, 0)
  const totalRevenue = services.reduce((sum, service) => sum + service.price * service.bookingsThisMonth, 0)

  return (
    <Layout breadcrumb={["ezenda", "layanan"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manajemen Layanan</h1>
            <p className="text-muted-foreground">Kelola layanan jasa salon dan barbershop</p>
          </div>
          <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Layanan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-background border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Tambah Layanan Baru</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="service-name" className="text-foreground">
                    Nama Layanan
                  </Label>
                  <Input
                    id="service-name"
                    placeholder="Masukkan nama layanan"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-category" className="text-foreground">
                    Kategori
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="text-foreground hover:bg-accent">
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-duration" className="text-foreground">
                    Durasi (menit)
                  </Label>
                  <Input
                    id="service-duration"
                    type="number"
                    placeholder="30"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-price" className="text-foreground">
                    Harga
                  </Label>
                  <Input
                    id="service-price"
                    type="number"
                    placeholder="75000"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="service-description" className="text-foreground">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="service-description"
                    placeholder="Deskripsi layanan"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="service-staff" className="text-foreground">
                    Staf yang Tersedia
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Pilih staf" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="maya" className="text-foreground hover:bg-accent">
                        Maya (Senior Stylist)
                      </SelectItem>
                      <SelectItem value="alex" className="text-foreground hover:bg-accent">
                        Alex (Barber)
                      </SelectItem>
                      <SelectItem value="lisa" className="text-foreground hover:bg-accent">
                        Lisa (Colorist)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddServiceOpen(false)}
                  className="border-border text-foreground hover:bg-accent"
                >
                  Batal
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Simpan Layanan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Scissors className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Layanan</p>
                  <p className="text-2xl font-bold text-foreground">{totalServices}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Scissors className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Layanan Aktif</p>
                  <p className="text-2xl font-bold text-foreground">{activeServices}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Booking Bulan Ini</p>
                  <p className="text-2xl font-bold text-foreground">{totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Bulan Ini</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Daftar Layanan</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Cari layanan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-background border-border text-foreground">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all" className="text-foreground hover:bg-accent">
                      Semua Kategori
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="text-foreground hover:bg-accent">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Layanan</TableHead>
                  <TableHead className="text-muted-foreground">Kategori</TableHead>
                  <TableHead className="text-muted-foreground">Durasi</TableHead>
                  <TableHead className="text-muted-foreground">Harga</TableHead>
                  <TableHead className="text-muted-foreground">Staf</TableHead>
                  <TableHead className="text-muted-foreground">Booking Bulan Ini</TableHead>
                  <TableHead className="text-muted-foreground">Rating</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id} className="border-border hover:bg-accent">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          className="w-10 h-10 rounded-lg object-cover bg-accent"
                        />
                        <div>
                          <p className="font-medium text-foreground">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-muted-foreground">
                        {service.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{formatDuration(service.duration)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{formatCurrency(service.price)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {service.staff.map((staff, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {staff}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <span className="font-medium text-foreground">{service.bookingsThisMonth}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-foreground">{service.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border-border">
                          <DropdownMenuItem className="text-foreground hover:bg-accent">
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-accent">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Layanan
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-accent">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Popular Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <span>Layanan Terpopuler</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {services
                  .filter((s) => s.status === "active")
                  .sort((a, b) => b.bookingsThisMonth - a.bookingsThisMonth)
                  .slice(0, 3)
                  .map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-2 bg-accent rounded-lg border border-border"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.bookingsThisMonth} booking</p>
                      </div>
                      <Badge className="bg-emerald-500 text-white">{formatCurrency(service.price)}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Rating Tertinggi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {services
                  .filter((s) => s.status === "active")
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
                  .map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-2 bg-accent rounded-lg border border-border"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDuration(service.duration)}</p>
                      </div>
                      <Badge className="bg-yellow-500 text-white">⭐ {service.rating}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-purple-500" />
                <span>Revenue Tertinggi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {services
                  .filter((s) => s.status === "active")
                  .sort((a, b) => b.price * b.bookingsThisMonth - a.price * a.bookingsThisMonth)
                  .slice(0, 3)
                  .map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-2 bg-accent rounded-lg border border-border"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{service.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(service.price * service.bookingsThisMonth)}
                        </p>
                      </div>
                      <Badge className="bg-purple-500 text-white">{service.bookingsThisMonth}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
