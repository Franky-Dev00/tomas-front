export type Design = {
  id: number
  name: string
  price: number
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
  email: string
  role: string
}
