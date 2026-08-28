import type { Metadata, Viewport } from "next"
import { Onest, Lora, Noto_Naskh_Arabic } from "next/font/google"
import { Providers } from "./providers"
import { ServiceWorkerRegister } from "@/components/pwa/sw-register"
import { LocalDataNotice } from "@/components/shared/local-data-notice"
import { PwaUpdater } from "@/components/pwa-updater"
import "./globals.css"

const sans = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans"
})

const heading = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-heading"
})

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic"
})

export const metadata: Metadata = {
  title: "Sakinah",
  description: "Тихий цифровой спутник для ежедневного поклонения",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sakinah"
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/icons/icon-180.png"
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1512" }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${heading.variable} ${arabic.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <LocalDataNotice />
          <PwaUpdater />
        </Providers>
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}