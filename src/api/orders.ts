import type { Item } from "@/lib/types";
import { api } from ".";
import type { LocalStorageItem } from "@/lib/hooks";

function createOrderAdapter(items: LocalStorageItem[]): { items: Item[] } {
  const newItems: Item[] = []
  for (let i = 0; i < items.length; i++) {
    const { quantity, design_id, garment_variant_id, unit_price } = items[i]
    newItems.push({ quantity, design_id, garment_variant_id, unit_price })
  }
  return { items: newItems }
}

export async function CreateOrder(data: LocalStorageItem[]) {
  const adaptedItems = createOrderAdapter(data)
  await api.post("/orders", adaptedItems)
}


