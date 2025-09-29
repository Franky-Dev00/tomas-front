export type Design = {
  id: number
  name: string
  price: number
  description: string
  features: string[]
  images: string[]
}

export type DesignsResponse = {
  designs: Design[]
  has_next: boolean
  has_prev: boolean
  next_page: number | null
  prev_page: number | null
  page: number
  pages: number
  total: number
}

export type User = {
  id: number
  name: string
  description: string
  features: string
  lastname: string
  email: string
  role: string
}

export type Garment = {
  id: number
  name: string
  price: number
  variants: GarmentVariant[]
}

export type GarmentVariant = {
  garment_id: number
  id: number
  price: number | null
  size: string
  stock: string
}

export type Item = {
  quantity: number
  unit_price: number
  design_id: number
  garment_variant_id: number
}
