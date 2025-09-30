import { LogOut, Package, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router";
import { useAuth } from "@/lib/hooks/auth";

export default function() {

  const { user, logOutHelper } = useAuth()


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
            {user.name} {user.lastname}
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
        <DropdownMenuItem onClick={logOutHelper}>
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
