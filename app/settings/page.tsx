"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Clock,
  Camera,
  Save,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Edit,
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    booking: true,
    payment: true,
    inventory: false,
  })

  const [businessHours, setBusinessHours] = useState([
    { day: "Senin", open: "09:00", close: "18:00", isOpen: true },
    { day: "Selasa", open: "09:00", close: "18:00", isOpen: true },
    { day: "Rabu", open: "09:00", close: "18:00", isOpen: true },
    { day: "Kamis", open: "09:00", close: "18:00", isOpen: true },
    { day: "Jumat", open: "09:00", close: "18:00", isOpen: true },
    { day: "Sabtu", open: "09:00", close: "17:00", isOpen: true },
    { day: "Minggu", open: "10:00", close: "16:00", isOpen: false },
  ])

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleBusinessHourChange = (index: number, field: string, value: string | boolean) => {
    setBusinessHours((prev) => prev.map((hour, i) => (i === index ? { ...hour, [field]: value } : hour)))
  }

  return (
    <Layout breadcrumb={["ezenda", "pengaturan"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
            <p className="text-muted-foreground">Kelola konfigurasi akun dan bisnis Anda</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="h-4 w-4 mr-2" />
            Simpan Semua
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Bisnis</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Keamanan</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Tampilan</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Informasi Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                      <Camera className="h-4 w-4 mr-2" />
                      Ubah Foto
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG maksimal 2MB</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      Nama Depan
                    </Label>
                    <Input id="firstName" defaultValue="Dara" className="bg-background border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Nama Belakang
                    </Label>
                    <Input id="lastName" defaultValue="Daru" className="bg-background border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="daradaru@gmail.com"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="+62 812-3456-7890"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-foreground">
                      Jabatan
                    </Label>
                    <Input
                      id="role"
                      defaultValue="Owner/Manager"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-foreground">
                      Zona Waktu
                    </Label>
                    <Select defaultValue="asia-jakarta">
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="asia-jakarta" className="text-foreground hover:bg-accent">
                          Asia/Jakarta (WIB)
                        </SelectItem>
                        <SelectItem value="asia-makassar" className="text-foreground hover:bg-accent">
                          Asia/Makassar (WITA)
                        </SelectItem>
                        <SelectItem value="asia-jayapura" className="text-foreground hover:bg-accent">
                          Asia/Jayapura (WIT)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Settings */}
          <TabsContent value="business" className="space-y-6">
            {/* Business Information */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Informasi Bisnis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-foreground">
                      Nama Bisnis
                    </Label>
                    <Input
                      id="businessName"
                      defaultValue="Ezenda Salon & Spa"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-foreground">
                      Jenis Bisnis
                    </Label>
                    <Select defaultValue="salon">
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="salon" className="text-foreground hover:bg-accent">
                          Salon
                        </SelectItem>
                        <SelectItem value="barbershop" className="text-foreground hover:bg-accent">
                          Barbershop
                        </SelectItem>
                        <SelectItem value="spa" className="text-foreground hover:bg-accent">
                          Spa
                        </SelectItem>
                        <SelectItem value="salon-spa" className="text-foreground hover:bg-accent">
                          Salon & Spa
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label htmlFor="businessAddress" className="text-foreground">
                      Alamat Bisnis
                    </Label>
                    <Textarea
                      id="businessAddress"
                      defaultValue="Jl. Sudirman No. 123, Jakarta Pusat 10220"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone" className="text-foreground">
                      Telepon Bisnis
                    </Label>
                    <Input
                      id="businessPhone"
                      defaultValue="+62 21 1234 5678"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail" className="text-foreground">
                      Email Bisnis
                    </Label>
                    <Input
                      id="businessEmail"
                      defaultValue="info@ezenda.com"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-foreground">
                      Website
                    </Label>
                    <Input
                      id="website"
                      defaultValue="www.ezenda.com"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-foreground">
                      NPWP
                    </Label>
                    <Input
                      id="taxId"
                      defaultValue="12.345.678.9-012.000"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Jam Operasional</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessHours.map((hour, index) => (
                    <div key={hour.day} className="flex items-center space-x-4">
                      <div className="w-20">
                        <span className="text-foreground font-medium">{hour.day}</span>
                      </div>
                      <Switch
                        checked={hour.isOpen}
                        onCheckedChange={(checked) => handleBusinessHourChange(index, "isOpen", checked)}
                      />
                      {hour.isOpen ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="time"
                            value={hour.open}
                            onChange={(e) => handleBusinessHourChange(index, "open", e.target.value)}
                            className="w-32 bg-background border-border text-foreground"
                          />
                          <span className="text-muted-foreground">-</span>
                          <Input
                            type="time"
                            value={hour.close}
                            onChange={(e) => handleBusinessHourChange(index, "close", e.target.value)}
                            className="w-32 bg-background border-border text-foreground"
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Tutup</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Preferensi Notifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">Terima notifikasi melalui SMS</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Terima notifikasi push di browser</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium text-foreground mb-4">Jenis Notifikasi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Booking Baru</h4>
                        <p className="text-sm text-muted-foreground">Notifikasi saat ada booking baru</p>
                      </div>
                      <Switch
                        checked={notifications.booking}
                        onCheckedChange={(checked) => handleNotificationChange("booking", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Pembayaran</h4>
                        <p className="text-sm text-muted-foreground">Notifikasi transaksi pembayaran</p>
                      </div>
                      <Switch
                        checked={notifications.payment}
                        onCheckedChange={(checked) => handleNotificationChange("payment", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Stok Rendah</h4>
                        <p className="text-sm text-muted-foreground">Peringatan saat stok produk rendah</p>
                      </div>
                      <Switch
                        checked={notifications.inventory}
                        onCheckedChange={(checked) => handleNotificationChange("inventory", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Keamanan Akun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-foreground">
                      Password Saat Ini
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        className="bg-background border-border text-foreground pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-foreground">
                      Password Baru
                    </Label>
                    <Input id="newPassword" type="password" className="bg-background border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">
                      Konfirmasi Password Baru
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Update Password</Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium text-foreground mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-accent rounded-lg border border-border">
                    <div>
                      <h4 className="font-medium text-foreground">2FA Status</h4>
                      <p className="text-sm text-muted-foreground">Tambahan keamanan untuk akun Anda</p>
                    </div>
                    <Badge variant="secondary" className="text-muted-foreground">
                      Tidak Aktif
                    </Badge>
                  </div>
                  <Button variant="outline" className="mt-4 border-border text-foreground hover:bg-accent">
                    Aktifkan 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Informasi Billing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">Plan Premium</h3>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">Aktif hingga 15 Februari 2024</p>
                    </div>
                    <Badge className="bg-emerald-500 text-white">Aktif</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Metode Pembayaran</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-accent rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">**** **** **** 1234</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-accent">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-200 text-red-500 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Metode Pembayaran
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium text-foreground mb-4">Riwayat Pembayaran</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-accent rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">Plan Premium - Januari 2024</p>
                        <p className="text-sm text-muted-foreground">15 Januari 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">Rp 299.000</p>
                        <Badge className="bg-emerald-500 text-white">Paid</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">Plan Premium - Desember 2023</p>
                        <p className="text-sm text-muted-foreground">15 Desember 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">Rp 299.000</p>
                        <Badge className="bg-emerald-500 text-white">Paid</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Pengaturan Tampilan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-foreground mb-3">Tema</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 border-2 border-primary rounded-lg cursor-pointer">
                        <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center text-foreground">Light</p>
                      </div>
                      <div className="p-4 border-2 border-border rounded-lg cursor-pointer hover:border-muted-foreground">
                        <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center text-foreground">Dark</p>
                      </div>
                      <div className="p-4 border-2 border-border rounded-lg cursor-pointer hover:border-muted-foreground">
                        <div className="w-full h-20 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-800 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center text-foreground">Auto</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-3">Warna Aksen</h3>
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-emerald-600 cursor-pointer"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-border cursor-pointer hover:border-blue-600"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-border cursor-pointer hover:border-purple-600"></div>
                      <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-border cursor-pointer hover:border-orange-600"></div>
                      <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-border cursor-pointer hover:border-pink-600"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Preferensi Lainnya</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Animasi Reduced</h4>
                        <p className="text-sm text-muted-foreground">Kurangi animasi untuk performa lebih baik</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Sidebar Collapsed</h4>
                        <p className="text-sm text-muted-foreground">Mulai dengan sidebar yang diciutkan</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
