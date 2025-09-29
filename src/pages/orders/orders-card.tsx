import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Order } from "@/lib/types";
import { getStatusColor, getStatusText } from "@/lib/utils";
import { CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ORDER_STATUS } from "@/lib/consts";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeOrderStatus } from "@/api/orders";
import { toast } from "sonner";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "sent":
      return <Truck className="h-4 w-4" />
    case "approved":
      return <CheckCircle className="h-4 w-4" />
    case "rejected":
      return <XCircle className="h-4 w-4" />
  }
}

export type OrderStatus = keyof typeof ORDER_STATUS;


export default function OrderCard({ order, role }: { order: Order; role?: string }) {

  const [status, setStatus] = useState<OrderStatus>()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ["order-status"],
    mutationFn: ({ id, status }: { id: number, status: OrderStatus }) => changeOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      toast.success("Estado modificado correctamente")
    }
  })

  function handleStatusChange(value: OrderStatus, id: number) {
    mutation.mutate({ id, status: value })
  }

  return (
    <Card key={order.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {role === "admin" && order.user && (
              <p className="text-sm text-muted-foreground mt-1">
                {order.user.name} - {order.user.email}
              </p>
            )}
          </div>
          <div className="text-right">
            <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
              {getStatusIcon(order.status)}
              {getStatusText(order.status)}
            </Badge>
            <p className="text-lg font-semibold mt-2">${order.items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <img
                src={item.design.images[0] || "/placeholder.svg"}
                alt={item.design.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.design.name}</p>
                <p className="text-xs text-muted-foreground">
                  Cantidad: {item.quantity} × ${item.unit_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {role === "admin" &&
          (
            <Select value={status} onValueChange={(value) => handleStatusChange(value as OrderStatus, order.id)} defaultValue={order.status}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cambiar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estados</SelectLabel>
                  {
                    Object.entries(ORDER_STATUS).map(([key, value]) => (
                      <SelectItem className={getStatusColor(key)} key={key} value={key}> {value} </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          )
        }
      </CardFooter>
    </Card>
  )
}
