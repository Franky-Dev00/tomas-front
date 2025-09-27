import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/users";
import { toast } from "sonner"
import { newUserSchema, type NewUserForm } from "@/lib/zod-schemas";
import RootError from "./error-root-badge";
import LabelError from "./error-label";
import ShowPassword from "./show-password";

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
      <RootError errorMessage={errors.root?.message} />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            placeholder="Juan"
            className={`h-11 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            {...register("name")}
          />
          <LabelError errorMessage={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastname">Apellido</Label>
          <Input
            id="lastname"
            placeholder="Pérez"
            className={`h-11 ${errors.lastname ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            {...register("lastname")}
          />
          <LabelError errorMessage={errors.lastname?.message} />
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
        <LabelError errorMessage={errors.email?.message} />
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
          <ShowPassword
            isVisible={showPassword}
            toggleIsVisible={setShowPassword}
          />
        </div>
        <LabelError errorMessage={errors.password?.message} />
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
          <ShowPassword
            isVisible={showConfirmPassword}
            toggleIsVisible={setShowConfirmPassword}
          />        </div>
        <LabelError errorMessage={errors.confirmPassword?.message} />
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
