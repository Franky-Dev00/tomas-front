import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ShowPassword from "./show-password";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "@/lib/zod-schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import RootError from "./error-root-badge";
import LabelError from "./error-label";
import { useAuthStore } from "@/store/auth-store";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const setAuthUser = useAuthStore((state) => state.setUser)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: login,
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setError("root", { "message": error.message })
      }
    },
    onSuccess: (response) => {
      toast.success(`Sesión iniciada como ${response.data.name} correctamente`)
      setAuthUser(response.data)
      queryClient.invalidateQueries({ queryKey: ["auth"] })
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      navigate("/")
    }
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data)
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <RootError errorMessage={errors.root?.message} />
      <div className="space-y-4">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          className="h-11"
          {...register("email")}
        />
        <LabelError errorMessage={errors.email?.message} />
      </div>
      <div className="space-y-4">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="h-11 pr-10"
            {...register("password")}
          />
          <ShowPassword
            isVisible={showPassword}
            toggleIsVisible={setShowPassword}
          />
        </div>
        <LabelError errorMessage={errors.password?.message} />
      </div>
      <Button disabled={mutation.isPending} type="submit" className="w-full h-11 text-base font-medium">
        {
          mutation.isPending
            ? "Iniciando sesión..."
            : "Iniciar Sesión"
        }
      </Button>
    </form>
  );
}
