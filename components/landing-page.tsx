"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  Scissors,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Instagram,
  Facebook,
  MessageCircle,
  Sparkles,
  Zap,
  Heart,
  LogIn,
} from "lucide-react"
import Logo from "./logo"

export function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    "/placeholder.svg?height=600&width=800&text=Modern+Salon+Interior",
    "/placeholder.svg?height=600&width=800&text=Professional+Barber",
    "/placeholder.svg?height=600&width=800&text=Hair+Styling",
  ]

  const services = [
    {
      name: "Hair Cut Classic",
      price: "Rp 75.000",
      duration: "30 menit",
      description: "Potongan rambut profesional dengan teknik terkini",
      icon: Scissors,
    },
    {
      name: "Hair Color Premium",
      price: "Rp 300.000",
      duration: "2 jam",
      description: "Pewarnaan rambut dengan produk berkualitas tinggi",
      icon: Sparkles,
    },
    {
      name: "Beard Trim & Shape",
      price: "Rp 35.000",
      duration: "20 menit",
      description: "Perawatan dan pembentukan jenggot profesional",
      icon: Scissors,
    },
    {
      name: "Facial Treatment",
      price: "Rp 150.000",
      duration: "60 menit.",
      description: "Perawatan wajah untuk kulit sehat dan bersih",
      icon: Heart,
    },
  ]

  const features = [
    {
      icon: Calendar,
      title: "Booking Online 24/7",
      description: "Reservasi kapan saja tanpa perlu telepon",
    },
    {
      icon: Users,
      title: "Staf Berpengalaman.",
      description: "Tim profesional dengan sertifikasi internasional",
    },
    {
      icon: Award,
      title: "Produk Premium",
      description: "Menggunakan produk berkualitas tinggi terpercaya",
    },
    {
      icon: Zap,
      title: "Layanan Cepat",
      description: "Efisien tanpa mengurangi kualitas hasil",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Pelayanan luar biasa! Hasil potong rambutnya sangat memuaskan dan stafnya ramah.",
      service: "Hair Cut & Color",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Tempat favorit untuk cukur jenggot. Hasilnya selalu rapi dan profesional.",
      service: "Beard Trim",
    },
    {
      name: "Emma Wilson",
      rating: 5,
      comment: "Facial treatmentnya amazing! Kulit jadi lebih bersih dan glowing.",
      service: "Facial Treatment",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo height={34} width={34} />
              <div>
                <h1 className="text-xl font-bold text-foreground">Ezenda</h1>
                <p className="text-xs text-muted-foreground">Salon & Barbershop</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Layanan
                </a>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tentang
                </a>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kontak
                </a>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Admin
                </Link>
              </div>
              
              <Link href="/booking/public">
                <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  ✨ Premium Salon Experience
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Transform Your
                  <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
                    {" "}
                    Style
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Salon & barbershop premium dengan layanan profesional. Booking online mudah, hasil memuaskan.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking/public">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Booking Sekarang
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/20"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Hubungi Kami
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.9</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImages[currentImageIndex] || "/placeholder.svg"}
                  alt="Salon Interior"
                  className="w-full h-[500px] object-cover transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Booking Confirmed</div>
                    <div className="text-sm text-muted-foreground">Sarah J. - Hair Cut</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Mengapa Pilih Ezenda?</h2>
            <p className="text-xl text-muted-foreground">Pengalaman salon terbaik dengan teknologi modern</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Layanan Kami</h2>
            <p className="text-xl text-muted-foreground">Berbagai layanan premium untuk penampilan terbaik Anda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-emerald-600">{service.price}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                    <Link href="/booking/public">
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        Book
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/booking/public">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
              >
                Lihat Semua Layanan & Book Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Kata Mereka</h2>
            <p className="text-xl text-muted-foreground">Testimoni dari pelanggan setia kami</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.service}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Kunjungi Kami</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Alamat</h3>
                    <p className="text-muted-foreground">Jl. Sudirman No. 123, Jakarta Pusat 10220</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Jam Operasional</h3>
                    <p className="text-muted-foreground">Senin - Minggu: 09:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Kontak</h3>
                    <p className="text-muted-foreground">+62 21 1234 5678</p>
                    <p className="text-muted-foreground">info@ezenda.com</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-8">
                <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
                  <Instagram className="h-4 w-4 mr-2" />
                  @ezenda.salon
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Google Maps</h3>
                <p className="text-muted-foreground mb-4">Lihat lokasi kami di peta</p>
                <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50">
                  Buka Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Siap untuk Tampil Lebih Percaya Diri?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Booking sekarang dan rasakan pengalaman salon premium yang tak terlupakan
          </p>
          <Link href="/booking/public">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Ezenda</h3>
                  <p className="text-sm text-muted-foreground">Premium Salon & Barbershop</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Salon dan barbershop premium dengan layanan profesional dan teknologi booking modern.
              </p>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Layanan</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Hair Cut</li>
                <li>Hair Color</li>
                <li>Beard Trim</li>
                <li>Facial Treatment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Kontak</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>+62 21 1234 5678</li>
                <li>info@ezenda.com</li>
                <li>Jl. Sudirman No. 123</li>
                <li>Jakarta Pusat</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">© 2024 Ezenda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
