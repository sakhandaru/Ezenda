"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, Search, QrCode, User } from "lucide-react"

export default function POS() {
  // Current customer and service
  const [currentCustomer] = useState({
    name: "Sarah",
    service: "Potong Rambut + Cuci",
    price: 150000,
  })

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Hair Serum",
      price: 85000,
      quantity: 1,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  // Frequently sold products for quick access
  const quickProducts = [
    { id: 1, name: "Pomade", price: 65000, image: "/placeholder.svg?height=120&width=120" },
    { id: 2, name: "Shampoo", price: 85000, image: "/placeholder.svg?height=120&width=120" },
    { id: 3, name: "Hair Tonic", price: 45000, image: "/placeholder.svg?height=120&width=120" },
    { id: 4, name: "Hair Serum", price: 85000, image: "/placeholder.svg?height=120&width=120" },
    { id: 5, name: "Conditioner", price: 70000, image: "/placeholder.svg?height=120&width=120" },
    { id: 6, name: "Hair Mask", price: 120000, image: "/placeholder.svg?height=120&width=120" },
    { id: 7, name: "Styling Gel", price: 55000, image: "/placeholder.svg?height=120&width=120" },
    { id: 8, name: "Hair Oil", price: 75000, image: "/placeholder.svg?height=120&width=120" },
  ]

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.name === product.name)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) => (item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const serviceTotal = currentCustomer.price
  const productsSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const grandTotal = serviceTotal + productsSubtotal

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method)
  }

  return (
    <Layout breadcrumb={["ezenda", "pos"]}>
      <div className="h-[calc(100vh-120px)] grid grid-cols-5 gap-6">
        {/* Left Column - Transaction Summary */}
        <div className="col-span-2 flex flex-col space-y-6">
          {/* Customer Information */}
          <Card className="border-2 border-border">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold text-foreground">Pelanggan: {currentCustomer.name}</span>
                </div>
                <div className="text-base text-muted-foreground">Layanan: {currentCustomer.service}</div>
              </div>
            </CardContent>
          </Card>

          {/* Billable Items */}
          <Card className="border-2 border-border flex-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <ShoppingCart className="h-5 w-5" />
                <span>Item Tagihan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Service Item */}
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div>
                  <div className="font-medium text-foreground">{currentCustomer.service}</div>
                  <div className="text-sm text-muted-foreground">Layanan</div>
                </div>
                <div className="text-lg font-semibold text-foreground">{formatCurrency(currentCustomer.price)}</div>
              </div>

              {/* Product Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-accent rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{formatCurrency(item.price)}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(item.id)}
                      className="h-8 w-8 p-0 rounded-full border-red-200 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-2 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium text-foreground">{formatCurrency(grandTotal)}</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold text-foreground">Total Bayar:</span>
                  <span className="text-2xl font-bold text-foreground">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Product Catalog */}
        <div className="col-span-3 flex flex-col space-y-6">
          {/* Search Bar */}
          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg bg-background border-border"
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Grid */}
          <Card className="border-2 border-border flex-1">
            <CardHeader>
              <CardTitle className="text-foreground">Produk Populer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 h-full">
                {quickProducts
                  .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product) => (
                    <Card
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 border-border hover:border-primary"
                    >
                      <CardContent className="p-4 text-center space-y-3">
                        <div className="aspect-square bg-accent rounded-lg flex items-center justify-center">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{product.name}</div>
                          <div className="text-sm font-semibold text-primary">{formatCurrency(product.price)}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Button */}
          <Button
            size="lg"
            onClick={() => setIsPaymentModalOpen(true)}
            className="h-16 text-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          >
            <CreditCard className="h-6 w-6 mr-3" />
            Lanjut ke Pembayaran
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-lg bg-background border-2 border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">Pilih Metode Pembayaran</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Total Amount */}
            <div className="text-center p-4 bg-accent rounded-lg border border-border">
              <div className="text-lg font-semibold text-foreground">Total Tagihan: {formatCurrency(grandTotal)}</div>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={selectedPaymentMethod === "cash" ? "default" : "outline"}
                size="lg"
                onClick={() => handlePaymentMethodSelect("cash")}
                className="h-16 text-lg justify-start border-2"
              >
                <Banknote className="h-6 w-6 mr-4" />
                Tunai
              </Button>

              <Button
                variant={selectedPaymentMethod === "qris" ? "default" : "outline"}
                size="lg"
                onClick={() => handlePaymentMethodSelect("qris")}
                className="h-16 text-lg justify-start border-2"
              >
                <QrCode className="h-6 w-6 mr-4" />
                QRIS
              </Button>

              <Button
                variant={selectedPaymentMethod === "card" ? "default" : "outline"}
                size="lg"
                onClick={() => handlePaymentMethodSelect("card")}
                className="h-16 text-lg justify-start border-2"
              >
                <CreditCard className="h-6 w-6 mr-4" />
                Kartu Debit/Kredit
              </Button>
            </div>

            {/* Dynamic Content Area */}
            <div className="min-h-[120px] bg-accent/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                {selectedPaymentMethod === "qris" && (
                  <div>
                    <QrCode className="h-12 w-12 mx-auto mb-2" />
                    <div>QR Code akan ditampilkan di sini</div>
                    <div className="text-sm">(Integrasi Midtrans)</div>
                  </div>
                )}
                {selectedPaymentMethod === "card" && (
                  <div>
                    <CreditCard className="h-12 w-12 mx-auto mb-2" />
                    <div>Terminal kartu akan aktif</div>
                    <div className="text-sm">(Integrasi Payment Gateway)</div>
                  </div>
                )}
                {selectedPaymentMethod === "cash" && (
                  <div>
                    <Banknote className="h-12 w-12 mx-auto mb-2" />
                    <div>Siap menerima pembayaran tunai</div>
                  </div>
                )}
                {!selectedPaymentMethod && <div className="text-sm">Pilih metode pembayaran untuk melanjutkan</div>}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsPaymentModalOpen(false)}
                className="flex-1 h-12 border-2"
              >
                Batal
              </Button>
              <Button
                size="lg"
                disabled={!selectedPaymentMethod}
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
              >
                Konfirmasi Pembayaran
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
