import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.alquran.cloud"
      }
    ]
  }
}

export default nextConfig