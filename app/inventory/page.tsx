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
  AlertTriangle,
  Package,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  TrendingDown,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  const categories = [
    { id: "hair-care", name: "Hair Care" },
    { id: "skin-care", name: "Skin Care" },
    { id: "beard-care", name: "Beard Care" },
    { id: "tools", name: "Tools & Equipment" },
    { id: "accessories", name: "Accessories" },
  ]

  const products = [
    {
      id: 1,
      name: "Premium Hair Serum",
      category: "Hair Care",
      sku: "HS001",
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      unitPrice: 150000,
      totalValue: 750000,
      supplier: "Beauty Supply Co.",
      lastRestocked: "2024-01-10",
      status: "low-stock",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Organic Shampoo",
      category: "Hair Care",
      sku: "SH002",
      currentStock: 25,
      minStock: 15,
      maxStock: 60,
      unitPrice: 85000,
      totalValue: 2125000,
      supplier: "Natural Products Ltd.",
      lastRestocked: "2024-01-15",
      status: "in-stock",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Anti-Aging Face Cream",
      category: "Skin Care",
      sku: "FC003",
      currentStock: 0,
      minStock: 8,
      maxStock: 30,
      unitPrice: 250000,
      totalValue: 0,
      supplier: "Skincare Innovations",
      lastRestocked: "2023-12-20",
      status: "out-of-stock",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Beard Oil Premium",
      category: "Beard Care",
      sku: "BO004",
      currentStock: 18,
      minStock: 12,
      maxStock: 40,
      unitPrice: 65000,
      totalValue: 1170000,
      supplier: "Men's Grooming Co.",
      lastRestocked: "2024-01-12",
      status: "in-stock",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Professional Hair Dryer",
      category: "Tools & Equipment",
      sku: "HD005",
      currentStock: 3,
      minStock: 2,
      maxStock: 8,
      unitPrice: 1200000,
      totalValue: 3600000,
      supplier: "Professional Tools Inc.",
      lastRestocked: "2024-01-05",
      status: "in-stock",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Hair Mask Treatment",
      category: "Hair Care",
      sku: "HM006",
      currentStock: 8,
      minStock: 15,
      maxStock: 45,
      unitPrice: 120000,
      totalValue: 960000,
      supplier: "Beauty Supply Co.",
      lastRestocked: "2024-01-08",
      status: "low-stock",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || product.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string, currentStock: number, minStock: number) => {
    if (status === "out-of-stock" || currentStock === 0) {
      return <Badge className="bg-red-500 text-white">Habis</Badge>
    } else if (status === "low-stock" || currentStock <= minStock) {
      return <Badge className="bg-orange-500 text-white">Stok Rendah</Badge>
    } else {
      return <Badge className="bg-emerald-500 text-white">Tersedia</Badge>
    }
  }

  const getStockIcon = (status: string, currentStock: number, minStock: number) => {
    if (status === "out-of-stock" || currentStock === 0) {
      return <AlertCircle className="h-4 w-4 text-red-500" />
    } else if (status === "low-stock" || currentStock <= minStock) {
      return <AlertTriangle className="h-4 w-4 text-orange-500" />
    } else {
      return <CheckCircle className="h-4 w-4 text-emerald-500" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalInventoryValue = products.reduce((sum, product) => sum + product.totalValue, 0)
  const lowStockCount = products.filter((p) => p.currentStock <= p.minStock).length
  const outOfStockCount = products.filter((p) => p.currentStock === 0).length
  const totalProducts = products.length

  return (
    <Layout breadcrumb={["ezenda", "inventori"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manajemen Inventori</h1>
            <p className="text-muted-foreground">Kelola stok produk dan peralatan salon</p>
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Produk
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-background border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Tambah Produk Baru</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="text-foreground">
                    Nama Produk
                  </Label>
                  <Input
                    id="product-name"
                    placeholder="Masukkan nama produk"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-sku" className="text-foreground">
                    SKU
                  </Label>
                  <Input
                    id="product-sku"
                    placeholder="Kode produk"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category" className="text-foreground">
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
                  <Label htmlFor="product-supplier" className="text-foreground">
                    Supplier
                  </Label>
                  <Input
                    id="product-supplier"
                    placeholder="Nama supplier"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price" className="text-foreground">
                    Harga Satuan
                  </Label>
                  <Input
                    id="product-price"
                    type="number"
                    placeholder="0"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-stock" className="text-foreground">
                    Stok Awal
                  </Label>
                  <Input
                    id="product-stock"
                    type="number"
                    placeholder="0"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-min-stock" className="text-foreground">
                    Stok Minimum
                  </Label>
                  <Input
                    id="product-min-stock"
                    type="number"
                    placeholder="0"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-max-stock" className="text-foreground">
                    Stok Maksimum
                  </Label>
                  <Input
                    id="product-max-stock"
                    type="number"
                    placeholder="0"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="product-description" className="text-foreground">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="product-description"
                    placeholder="Deskripsi produk (opsional)"
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddProductOpen(false)}
                  className="border-border text-foreground hover:bg-accent"
                >
                  Batal
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Simpan Produk</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Produk</p>
                  <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Nilai Inventori</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalInventoryValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Stok Rendah</p>
                  <p className="text-2xl font-bold text-foreground">{lowStockCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Stok Habis</p>
                  <p className="text-2xl font-bold text-foreground">{outOfStockCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Alerts */}
        {(lowStockCount > 0 || outOfStockCount > 0) && (
          <Card className="border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-200 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Peringatan Stok</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {outOfStockCount > 0 && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{outOfStockCount} produk habis stok</span>
                  </div>
                )}
                {lowStockCount > 0 && (
                  <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">{lowStockCount} produk stok rendah</span>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/20"
                >
                  Lihat Detail Peringatan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Daftar Produk</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Cari produk, SKU, atau supplier..."
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
                  <TableHead className="text-muted-foreground">Produk</TableHead>
                  <TableHead className="text-muted-foreground">SKU</TableHead>
                  <TableHead className="text-muted-foreground">Kategori</TableHead>
                  <TableHead className="text-muted-foreground">Stok</TableHead>
                  <TableHead className="text-muted-foreground">Harga Satuan</TableHead>
                  <TableHead className="text-muted-foreground">Nilai Total</TableHead>
                  <TableHead className="text-muted-foreground">Supplier</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="border-border hover:bg-accent">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-accent"
                        />
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Terakhir restock: {new Date(product.lastRestocked).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-foreground">{product.sku}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-muted-foreground">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStockIcon(product.status, product.currentStock, product.minStock)}
                        <div>
                          <p className="font-medium text-foreground">{product.currentStock}</p>
                          <p className="text-xs text-muted-foreground">Min: {product.minStock}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{formatCurrency(product.unitPrice)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{formatCurrency(product.totalValue)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground">{product.supplier}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status, product.currentStock, product.minStock)}</TableCell>
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
                            Edit Produk
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-accent">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Restock
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span>Produk Stok Rendah</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {products
                  .filter((p) => p.currentStock <= p.minStock && p.currentStock > 0)
                  .slice(0, 3)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 bg-accent rounded-lg border border-border"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Stok: {product.currentStock}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-accent">
                        Restock
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span>Produk Habis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {products
                  .filter((p) => p.currentStock === 0)
                  .slice(0, 3)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 bg-accent rounded-lg border border-border"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-red-500">Stok habis</p>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Order
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <span>Produk Terlaris</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {products
                  .filter((p) => p.currentStock > 0)
                  .sort((a, b) => b.totalValue - a.totalValue)
                  .slice(0, 3)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 bg-accent rounded-lg border border-border"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Nilai: {formatCurrency(product.totalValue)}</p>
                      </div>
                      <Badge className="bg-emerald-500 text-white">{product.currentStock}</Badge>
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
