import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { useLocalStorage } from "@/lib/hooks"
import { useAuthStore } from "@/store/auth-store"
import { Link } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { CreateOrder } from "@/api/orders"
import { toast } from "sonner"

export function CartModal() {

  const [isOpen, setIsOpen] = useState(false)

  const user = useAuthStore(state => state.user)

  const cartItemsCount = useCartStore(state => state.totalItems)
  const cartItems = useCartStore(state => state.items)
  const { setItemQuantity, deleteItem, clearItems } = useLocalStorage()

  //TODO: verificar que se eliminen los items del carrito 
  const mutation = useMutation({
    mutationFn: CreateOrder,
    mutationKey: ["new-order"],
    onError: () => {
      toast.error("Algo salió mal, intenta nuevamente")
    },
    onSuccess: () => {
      toast.success("Su pedido ha sido creado correctamente")
      setIsOpen(false)
      clearItems()
    }
  })

  function handleQuantity(id: string, newQuantity: number) {
    if (newQuantity <= 0) {
      setItemQuantity(id, 1)
      return
    }
    setItemQuantity(id, newQuantity)
  }

  function handleCreateorder() {
    mutation.mutate(cartItems)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItemsCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrito de Compras
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {cartItems?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {item.size}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.garment}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-sm">${item.unit_price * item.quantity}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => handleQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => handleQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"

                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems && cartItems.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex justify-between items-center font-semibold">
                <span>Total:</span>
                <span className="text-lg">${cartItems.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1 bg-transparent">
                  Continuar Comprando
                </Button>
                {
                  user
                    ?
                    <Button onClick={handleCreateorder} disabled={mutation.isPending} className="flex-1">
                      {
                        mutation.isPending
                          ? "Creando pedido..."
                          : "Confirmar pedido"
                      }
                    </Button>
                    :
                    <Button className="flex-1" onClick={() => setIsOpen(false)} >
                      <Link to="/ingresar" > Inicia sesión para continuar</Link>
                    </Button>
                }
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

