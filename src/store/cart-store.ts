import type { LocalStorageItem } from "@/lib/hooks"
import { create } from "zustand"


type CartStore = {
  totalItems: number
  setTotalItems: (total: number) => void
  items: LocalStorageItem[]
  setItems: (items: LocalStorageItem[]) => void
}

export const useCartStore = create<CartStore>((set) => ({
  totalItems: 0,
  setTotalItems: (total) => set({ totalItems: total }),
  items: [],
  setItems: (items) => set({ items }),
}))

