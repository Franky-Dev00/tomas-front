import { z } from "zod";

export const newUserSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),

  lastname: z.string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras"),

  email: z.email("Por favor ingresa un correo electrónico válido")
    .min(1, "El correo electrónico es requerido"),

  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "La contraseña debe contener al menos una minúscula, una mayúscula y un número"),

  confirmPassword: z.string()
    .min(1, "Por favor confirma tu contraseña")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});


export type NewUserForm = z.infer<typeof newUserSchema>;

export const loginSchema = z.object({
  email: z.email("Por favor ingresa un correo electrónico válido")
    .min(1, "El correo electrónico es requerido"),

  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "La contraseña debe contener al menos una minúscula, una mayúscula y un número"),
})


export type LoginForm = z.infer<typeof loginSchema>;

