import type { DesignsResponse } from "@/lib/types"
import { api } from "."

export async function getDesigns(query: string): Promise<DesignsResponse> {
  const response = await api.get<DesignsResponse>(`/designs?name=${query}`)
  return response.data
}
