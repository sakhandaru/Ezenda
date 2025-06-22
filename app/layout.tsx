import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Logo from "@/components/logo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ezenda - Business Management System",
  description: "Sistem manajemen bisnis untuk salon, barbershop, dan spa",
  icons: {
    icon: "/Group 6.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
