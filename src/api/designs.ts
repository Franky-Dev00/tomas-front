import type { DesignsResponse } from "@/lib/types"
import { api } from "."

export async function getDesigns(): Promise<DesignsResponse> {
  const response = await api.get<DesignsResponse>("/designs")
  return response.data
}
