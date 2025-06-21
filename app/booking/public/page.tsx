"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, Phone, Mail, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

export default function PublicBooking() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedStaff, setSelectedStaff] = useState("")
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const services = [
    { id: 1, name: "Hair Cut Classic", duration: 30, price: "Rp 75.000", staff: ["Maya", "Alex"] },
    { id: 2, name: "Hair Wash & Blow Dry", duration: 45, price: "Rp 50.000", staff: ["Maya", "Alex", "Lisa"] },
    { id: 3, name: "Hair Color Premium", duration: 120, price: "Rp 300.000", staff: ["Lisa"] },
    { id: 4, name: "Beard Trim & Shape", duration: 20, price: "Rp 35.000", staff: ["Alex"] },
    { id: 5, name: "Facial Deep Cleansing", duration: 60, price: "Rp 150.000", staff: ["Maya", "Lisa"] },
  ]

  const staff = [
    { id: "maya", name: "Maya (Senior Stylist)" },
    { id: "alex", name: "Alex (Barber)" },
    { id: "lisa", name: "Lisa (Colorist)" },
  ]

  // Generate time slots from 9 AM to 6 PM
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // Mock booked slots - in real app, this would come from API
  const bookedSlots = [
    { date: "2024-01-20", time: "09:00", staff: "maya" },
    { date: "2024-01-20", time: "10:30", staff: "alex" },
    { date: "2024-01-20", time: "14:00", staff: "lisa" },
    { date: "2024-01-21", time: "11:00", staff: "maya" },
  ]

  const getWeekDays = () => {
    const days = []
    const startOfWeek = new Date(currentWeek)
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1) // Start from Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekDays = getWeekDays()

  const isSlotAvailable = (date: string, time: string, staffMember: string) => {
    return !bookedSlots.some((slot) => slot.date === date && slot.time === time && slot.staff === staffMember)
  }

  const getAvailableStaffForSlot = (date: string, time: string) => {
    if (!selectedService) return []

    const service = services.find((s) => s.id === selectedService)
    if (!service) return []

    return service.staff.filter((staffName) => {
      const staffId = staffName.toLowerCase()
      return isSlotAvailable(date, time, staffId)
    })
  }

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 ? `${hours}j ${remainingMinutes}m` : `${hours} jam`
    }
    return `${minutes} menit`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Ezenda Salon & Spa</h1>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Jl. Sudirman No. 123, Jakarta
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Buka Setiap Hari</p>
            <p className="text-sm font-medium text-foreground">09:00 - 18:00</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Service Selection */}
          <div className="lg:col-span-1 space-y-6">
            {/* Services */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <span>1. Pilih Layanan</span>
                  {selectedService && (
                    <Badge className="bg-emerald-500 text-white">
                      <CheckCircle className="h-3 w-3" />
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service.id)
                        setSelectedTime("")
                        setSelectedStaff("")
                      }}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedService === service.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <h3 className="font-semibold text-foreground text-sm">{service.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDuration(service.duration)}
                        </span>
                        <span className="font-bold text-primary text-sm">{service.price}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs text-muted-foreground">Staf: {service.staff.join(", ")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">2. Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    className="mt-1 bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">
                    Nomor HP
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="phone"
                      placeholder="08xxxxxxxxxx"
                      className="mt-1 pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email (Opsional)
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      className="mt-1 pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Calendar */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <span>3. Pilih Tanggal & Waktu</span>
                    {selectedDate && selectedTime && (
                      <Badge className="bg-emerald-500 text-white">
                        <CheckCircle className="h-3 w-3" />
                      </Badge>
                    )}
                  </CardTitle>
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
                    <span className="text-sm font-medium text-foreground">
                      {weekDays[0].toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                    </span>
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
                </div>
              </CardHeader>
              <CardContent>
                {selectedService ? (
                  <div className="space-y-4">
                    {/* Week Days Header */}
                    <div className="grid grid-cols-8 gap-2">
                      <div className="text-center text-sm font-medium text-muted-foreground">Waktu</div>
                      {weekDays.map((day, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xs text-muted-foreground">
                            {day.toLocaleDateString("id-ID", { weekday: "short" })}
                          </div>
                          <div className="text-sm font-medium text-foreground">{day.getDate()}</div>
                        </div>
                      ))}
                    </div>

                    {/* Time Slots Grid */}
                    <div className="max-h-96 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                          <div className="text-xs text-muted-foreground py-2 text-center">{time}</div>
                          {weekDays.map((day, dayIndex) => {
                            const dateStr = day.toISOString().split("T")[0]
                            const availableStaff = getAvailableStaffForSlot(dateStr, time)
                            const isAvailable = availableStaff.length > 0
                            const isPast = new Date(`${dateStr} ${time}`) < new Date()

                            return (
                              <Button
                                key={dayIndex}
                                variant={selectedDate === dateStr && selectedTime === time ? "default" : "outline"}
                                size="sm"
                                disabled={!isAvailable || isPast}
                                onClick={() => {
                                  setSelectedDate(dateStr)
                                  setSelectedTime(time)
                                  setSelectedStaff("")
                                }}
                                className={`h-8 text-xs ${
                                  !isAvailable || isPast
                                    ? "opacity-50 cursor-not-allowed"
                                    : "border-border text-foreground hover:bg-accent"
                                } ${
                                  selectedDate === dateStr && selectedTime === time
                                    ? "bg-primary text-primary-foreground"
                                    : ""
                                }`}
                              >
                                {isAvailable && !isPast ? "✓" : "✗"}
                              </Button>
                            )
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Staff Selection */}
                    {selectedDate && selectedTime && (
                      <div className="mt-4 p-4 bg-accent rounded-lg border border-border">
                        <Label className="text-foreground font-medium">Pilih Staf (Opsional)</Label>
                        <div className="mt-2 space-y-2">
                          <Button
                            variant={selectedStaff === "" ? "default" : "outline"}
                            onClick={() => setSelectedStaff("")}
                            className="w-full justify-start text-sm"
                          >
                            Staf Mana Saja
                          </Button>
                          {getAvailableStaffForSlot(selectedDate, selectedTime).map((staffName) => (
                            <Button
                              key={staffName}
                              variant={selectedStaff === staffName ? "default" : "outline"}
                              onClick={() => setSelectedStaff(staffName)}
                              className="w-full justify-start text-sm border-border text-foreground hover:bg-accent"
                            >
                              <User className="h-4 w-4 mr-2" />
                              {staffName}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Pilih layanan terlebih dahulu untuk melihat jadwal tersedia</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Ringkasan Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedService && (
                  <div className="p-3 bg-accent rounded-lg border border-border">
                    <p className="font-medium text-foreground">
                      {services.find((s) => s.id === selectedService)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDuration(services.find((s) => s.id === selectedService)?.duration || 0)}
                    </p>
                    <p className="font-bold text-primary">{services.find((s) => s.id === selectedService)?.price}</p>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {new Date(selectedDate).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{selectedTime}</span>
                    </div>
                  </div>
                )}

                {selectedStaff && (
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedStaff}</span>
                  </div>
                )}

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!selectedService || !selectedDate || !selectedTime}
                >
                  Kirim Booking
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Booking akan dikonfirmasi oleh admin dalam 1-2 jam
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
