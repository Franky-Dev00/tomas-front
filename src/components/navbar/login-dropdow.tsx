import { LogOut, Package, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import { type User } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router";

type Props = {
  user: User | null
}

export default function({ user }: Props) {

  if (!user) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <Link to="/ingresar">
          <Button variant="ghost" size="sm">
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <UserIcon className="h-4 w-4 mr-2" />
            {user.name}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/pedidos">
          <DropdownMenuItem>
            <Package className="h-4 w-4 mr-2" />
            Mis pedidos
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
