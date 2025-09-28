import type { Design, DesignsResponse } from "@/lib/types"
import { api } from "."

export async function getDesigns(query: string): Promise<DesignsResponse> {
  const response = await api.get<DesignsResponse>(`/designs?name=${query}`)
  return response.data
}

export async function getDesignById(id?: string) {
  const response = await api.get<Design>(`/designs/${id}`)
  return response.data
}

