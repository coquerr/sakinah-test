import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PrivacyNoticeState {
  dismissed: boolean
  dismiss: () => void
}

export const usePrivacyNoticeStore = create<PrivacyNoticeState>()(
  persist(
    (set) => ({
      dismissed: false,
      dismiss: () => set({ dismissed: true })
    }),
    {
      name: "sakinah-privacy-notice",
      skipHydration: true
    }
  )
)