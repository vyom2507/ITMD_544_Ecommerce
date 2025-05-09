import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SwiftShop",
  description: "Ecommerce backend system by Vyom",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html lang="en" suppressHydrationWarning={true}>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}>
        <nav className="bg-gray-800 shadow p-4 flex justify-center gap-6 text-base font-medium">
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/customers">Customers</Link>
          <Link href="/products">Products</Link>
          <Link href="/orders">Orders</Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
