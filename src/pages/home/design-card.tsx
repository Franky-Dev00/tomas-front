import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Design } from "@/lib/types"
import { useNavigate } from "react-router"

type Props = {
  design: Design
}

export default function DesignCard({ design }: Props) {

  const navigate = useNavigate()

  function handleClick() {
    navigate(`/diseño/${design.id}`)
  }

  return (
    <Card key={design.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={design.images[0] || "/placeholder.svg"}
          alt={design.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate">{design.name}</h3>
          <span className="font-bold text-primary">${design.price.toLocaleString("de-DE")}</span>
        </div>
        <Button
          onClick={handleClick}
          className="w-full"
        >
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  )

}
