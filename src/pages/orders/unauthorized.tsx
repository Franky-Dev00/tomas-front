import { Button } from "@/components/ui/button";
import { Link } from "react-router";


export default function Unauthorized() {

  return (
    <main className="flex flex-col gap-10 items-center justify-center mt-10">
      <h1 className="font-bold text-3xl">Debes iniciar sesión para gestionar pedidos</h1>
      <div className="flex items-center gap-10">
        <Button variant="outline">
          <Link to="/"> Ver diseños </Link>
        </Button>
        <Button>
          <Link to="/ingresar"> Iniciar sesión </Link>
        </Button>
      </div>
    </main>
  )
}
