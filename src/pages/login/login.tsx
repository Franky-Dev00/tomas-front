import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="flex flex-col gap-8 ">
      <div className="space-y-4">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input id="email" type="email" placeholder="tu@email.com" className="h-11" />
      </div>
      <div className="space-y-4">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="h-11 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
      <Button className="w-full h-11 text-base font-medium">Iniciar Sesión</Button>
    </form>
  )
}
