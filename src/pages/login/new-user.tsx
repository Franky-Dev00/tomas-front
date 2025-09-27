import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/users";
import { toast } from "sonner"
import { newUserSchema, type NewUserForm } from "@/lib/zod-schemas";

type Props = {
  reset: () => void
}

export function NewUser({ reset }: Props) {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationKey: ["users"],
    mutationFn: createUser,
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setError("root", { "message": error.message })
      }
    },
    onSuccess: () => {
      reset()
      toast.success("Usuario creado con exito")
    }
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewUserForm>({
    resolver: zodResolver(newUserSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data: NewUserForm) => {
    mutation.mutate(data)
  };

  return (
    <form className="max-w-md space-y-4 mx-auto p-6">
      {errors.root && (
        <div className="p-3 border border-red-200 bg-red-50 rounded-md">
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errors.root.message}</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            placeholder="Juan"
            className={`h-11 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            {...register("name")}
          />
          {errors.name && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              {errors.name.message}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastname">Apellido</Label>
          <Input
            id="lastname"
            placeholder="Pérez"
            className={`h-11 ${errors.lastname ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            {...register("lastname")}
          />
          {errors.lastname && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              {errors.lastname.message}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          className={`h-11 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          {...register("email")}
        />
        {errors.email && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`h-11 pr-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            {...register("password")}
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
        {errors.password && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            {errors.password.message}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`h-11 pr-10 ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            {...register("confirmPassword")}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            {errors.confirmPassword.message}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-base font-medium mt-6"
        disabled={mutation.isPending}
        onClick={handleSubmit(onSubmit)}
      >
        {mutation.isPending ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>
    </form>
  )
}
