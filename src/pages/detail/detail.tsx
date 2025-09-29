import { getDetailData } from "@/api/detail"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import Cart from "./cart"
import type { Garment, GarmentVariant } from "@/lib/types"
import { useLocalStorage, type LocalStorageItem } from "@/lib/hooks"
import { toast } from "sonner"

type Params = {
  id: string
}

export default function Detail() {

  const params = useParams<Params>()
  if (!params.id) {
    return <h1>Not found</h1>
  }

  const { addItem, checkIfExists } = useLocalStorage()

  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ["detail"],
    queryFn: async () => getDetailData(params.id)
  })

  const [selectedGarment, setSelectedGarment] = useState<Garment | undefined>()
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<GarmentVariant | undefined>()

  function createItem() {
    return {
      id: crypto.randomUUID(),
      quantity,
      unit_price: currentPrice,
      design_id: data?.design.id,
      garment_variant_id: selectedSize?.id,
      name: data?.design.name,
      image: data?.design.images[0],
      size: selectedSize?.size,
      garment: selectedGarment?.name
    }
  }

  function handleAddItem() {
    const item = createItem()
    if (checkIfExists(item.id, item.garment_variant_id as number)) {
      toast.error(`El artículo ${selectedGarment?.name} ${data?.design.name} ${selectedSize?.size} ya esta en tu carrito`)
    } else {
      addItem(item as LocalStorageItem)
      toast.success(`Se ha agregado ${quantity} ${selectedGarment?.name} ${data?.design.name} ${selectedSize?.size} al carrito!`)
      navigate("/")
    }
  }

  function handleGarmentChange(garment: Garment) {
    setSelectedGarment(garment)
    let newPrice = 0
    if (data?.design) {
      newPrice = garment.price + data.design.price
    }
    setSelectedSize(garment.variants[0])
    setCurrentPrice(newPrice)
  }
  function handleSizeChange(variant: GarmentVariant) {
    setSelectedSize(variant)
    let newPrice = variant.price ?? 0
    if (data?.design) {
      newPrice += data.design.price
    }
    if (selectedGarment) {
      newPrice += selectedGarment.price
    }
    setCurrentPrice(newPrice)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la tienda
        </Button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Cart images={data?.design.images} name={data?.design.name} />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data?.design.name}</h1>
            <div className="flex items-center gap-3 mb-16">
              <span className="text-3xl font-bold text-primary">${data?.design.price.toLocaleString("de-DE")}</span>
            </div>
          </div>
          <Separator />

          {/* Garment select */}

          <div>
            <h3 className="font-semibold mb-3">Formato</h3>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {data?.garments.map((garment) => (
                <Button
                  key={garment.name}
                  variant={selectedGarment?.name === garment.name ? "default" : "outline"}
                  onClick={() => handleGarmentChange(garment)}
                  className="justify-between"
                >
                  <span>{garment.name}</span>
                  <span>${garment.price}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* size select */}
          {selectedGarment && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Talla</h3>
              <div className="flex flex-wrap gap-2">
                {selectedGarment?.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant={selectedSize?.size === variant.size ? "default" : "outline"}
                    onClick={() => handleSizeChange(variant)}
                    className="w-12 h-12"
                  >
                    {variant.size}
                  </Button>
                ))}
              </div>
            </div>
          )
          }


          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Cantidad</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator />

          {/* Actions */}
          <div className="space-y-3">
            <Button disabled={!currentPrice || !selectedGarment || !selectedSize} onClick={handleAddItem} className="w-full h-12 text-base font-medium">
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {`Agregar al Carrito  ${currentPrice ? `- $${(currentPrice * quantity).toLocaleString("de-DE")}` : ""}`}
              </>
            </Button>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">{data?.design.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Características</h2>
            <ul className="space-y-2">
              {data?.design.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div >)
}

