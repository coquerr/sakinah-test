import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { idbStorage } from "@/lib/idb-storage"

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
      skipHydration: true,
      storage: createJSONStorage(() => idbStorage)
    }
  )
)