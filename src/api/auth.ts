import type { User } from "@/lib/types";
import { api } from ".";
import type { LoginForm } from "@/lib/zod-schemas";


export async function getProfile() {
  const response = await api.get<User>("/auth/profile")
  return response.data
}

export async function login(data: LoginForm) {
  return await api.post<User>("/auth/login", data)
}


export async function logOut() {
  return await api.post("/auth/logout")
}
