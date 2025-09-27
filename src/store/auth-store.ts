import type { User } from "@/lib/types"
import { create } from "zustand"


type AuthStore = {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user })
}))

