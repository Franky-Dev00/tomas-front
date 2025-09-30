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

type OrderItem = {
  id: number;
  quantity: number;
  unit_price: number;
  design: {
    name: string
    images: string[]
  }
  variant: {
    size: string
    garment: {
      name: string
    }
  }
}

export type OrderStatus = "pending" | "sent" | "approved" | "rejected";

export type Order = {
  created_at: string;
  id: number;
  items: OrderItem[];
  receipt: string;
  status: OrderStatus;
  user: User;
}

export type OrdersResponse = {
  has_next: boolean;
  has_prev: boolean;
  next_page: number | null;
  orders: Order[];
  page: number;
  pages: number;
  prev_page: number | null;
  total: number;
}
