import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getOrders } from "@/api/orders"
import OrderCard from "./orders-card"
import { useAuth } from "@/lib/hooks/auth"
import SearchBar from "../home/search-bar"
import Unauthorized from "./unauthorized"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  const { user } = useAuth()

  if (!user) {
    return <Unauthorized />
  }

  const { data } = useQuery({
    queryFn: async () => getOrders(debouncedSearchQuery),
    queryKey: ["orders", debouncedSearchQuery]
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{user?.role === "admin" ? "Gestión de Pedidos" : "Mis Pedidos"}</h1>
        <p className="text-muted-foreground">
          {user?.role === "admin" ? "Administra las órdenes de la tienda" : "Revisa el estado de tus pedidos"}
        </p>
      </div>


      {
        user?.role === "admin" && (
          <SearchBar
            setQuery={setSearchQuery}
            setDebouncedQuery={setDebouncedSearchQuery}
            placeholder="Buscar por nombre o email..."
            query={searchQuery}
          />
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {
          data?.orders.map((order) => (
            <OrderCard key={order.id} role={user?.role} order={order} />
          ))}
      </div>
      {data?.orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tienes órdenes aún</h3>
          <p className="text-muted-foreground mb-4">Cuando realices tu primera compra, aparecerá aquí</p>
          <Button>Explorar Diseños</Button>
        </div>
      )}
    </div>
  )
}

