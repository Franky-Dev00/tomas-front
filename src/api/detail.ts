import type { Design, Garment } from "@/lib/types";
import { api } from ".";


export async function getDesignById(id?: string) {
  const response = await api.get<Design>(`/designs/${id}`)
  return response.data
}

export async function getGarments() {
  const response = await api.get<Garment[]>("/garments")
  return response.data
}


export async function getDetailData(id?: string) {
  const [design, garments] = await Promise.all([
    await getDesignById(id),
    await getGarments()
  ])

  return {
    design,
    garments
  }
}
