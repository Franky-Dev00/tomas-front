import type { Item, OrdersResponse, OrderStatus } from "@/lib/types";
import { api } from ".";
import type { LocalStorageItem } from "@/lib/hooks/localStorage";

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


export async function getOrders(q?: string) {
  let path = "/orders"
  path = q ? path + `?q=${q}` : path
  const response = await api.get<OrdersResponse>(path)
  return response.data
}

export async function changeOrderStatus(id: number, status: OrderStatus) {
  await api.put(`/orders/${id}`, { status })
}

// incluirla en la pagina order
// ver cambiar la pagina por tipo de usuario 
// kkk
