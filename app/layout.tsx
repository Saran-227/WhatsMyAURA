import type React from "react"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-black text-white antialiased">{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
