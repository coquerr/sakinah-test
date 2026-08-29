import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TasbihState {
  count: number
  goal: number
  increment: () => void
  reset: () => void
  setGoal: (goal: number) => void
}

export const useTasbihStore = create<TasbihState>()(
  persist(
    (set) => ({
      count: 0,
      goal: 33, // Стандартный круг тасбиха
      increment: () => set((state) => ({ count: state.count + 1 })),
      reset: () => set({ count: 0 }),
      setGoal: (goal) => set({ goal }),
    }),
    { name: "sakinah-tasbih" }
  )
)