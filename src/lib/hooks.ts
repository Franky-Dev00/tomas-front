import { useEffect, useState } from "react";
import type { Item } from "./types";
import { useCartStore } from "@/store/cart-store";

export type LocalStorageItem = Item & { id: string }

export function useLocalStorage() {

  const [items, setItems] = useState<LocalStorageItem[]>([])

  const setTotalItems = useCartStore(state => state.setTotalItems)

  useEffect(() => {
    if (window.localStorage) {
      const data = window.localStorage.getItem("items")
      setItems(data ? JSON.parse(data) : [])
    }
  }, [])

  function addItem(newItem: LocalStorageItem) {
    const newItems = [...items, newItem]
    window.localStorage.setItem("items", JSON.stringify(newItems))
    setItems(newItems)
    setTotalItems(getTotalItems(newItems))
  }

  function deleteItem(id: string) {
    const newItems = items.filter((item) => item.id === id)
    window.localStorage.setItem("items", JSON.stringify(newItems))
    setTotalItems(getTotalItems(newItems))
  }

  function setItemQuantity(id: string, newQuantity: number) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item, quantity: newQuantity
        }
      }
      return item
    })
    window.localStorage.setItem("items", JSON.stringify(newItems))
    setTotalItems(getTotalItems(newItems))
  }

  function getTotalItems(items: LocalStorageItem[]) {
    if (items.length === 0) return 0
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    return totalItems
  }

  function checkIfExists(variantId: number) {
    return items.find((item) => item.garment_variant_id === variantId)
  }

  return {
    addItem,
    deleteItem,
    setItemQuantity,
    checkIfExists
  }
}
