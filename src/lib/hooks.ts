import { useEffect } from "react";
import type { Item } from "./types";
import { useCartStore } from "@/store/cart-store";

export type LocalStorageItem = Item & { id: string, name: string, image: string, size: string, garment: string }

export function useLocalStorage() {


  const setTotalItems = useCartStore(state => state.setTotalItems)
  const setStoreItems = useCartStore(state => state.setItems)
  const items = useCartStore(state => state.items)


  useEffect(() => {
    if (window.localStorage) {
      const data = window.localStorage.getItem("items")
      if (data) {
        const parsedItems: LocalStorageItem[] = JSON.parse(data)
        setStoreItems(parsedItems)
        setTotalItems(parsedItems.reduce((acc, item) => acc + item.quantity, 0))
      }
    }
  }, [])

  function addItem(newItem: LocalStorageItem) {
    const newItems = [...items, newItem]
    window.localStorage.setItem("items", JSON.stringify(newItems))
    setTotalItems(getTotalItems(newItems))
    setStoreItems(newItems)
  }

  function deleteItem(id: string) {
    const newItems = items.filter((item) => item.id !== id)
    window.localStorage.setItem("items", JSON.stringify(newItems))
    setTotalItems(getTotalItems(newItems))
    setStoreItems(newItems)
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
    setStoreItems(newItems)

  }

  function getTotalItems(items: LocalStorageItem[]) {
    if (items.length === 0) return 0
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    return totalItems
  }

  function checkIfExists(id: string, variantId: number) {
    return items.find((item) => item.garment_variant_id === variantId && item.id === id)
  }

  function clearItems() {
    window.localStorage.setItem("items", JSON.stringify([]))
    setStoreItems([])
    setTotalItems(0)
  }

  return {
    addItem,
    deleteItem,
    setItemQuantity,
    checkIfExists,
    clearItems
  }
}
