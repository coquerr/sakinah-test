import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { PageTransition } from "@/components/layout/page-transition"
import { GeometricPattern } from "@/components/shared/geometric-pattern"
import { OnboardingModal } from "@/components/onboarding/onboarding-modal"

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GeometricPattern />
      <OnboardingModal />
      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-md px-6 pb-24 pt-6">
          <PageTransition>{children}</PageTransition>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}