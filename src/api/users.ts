import type { NewUserForm } from "@/lib/zod-schemas";
import { api } from ".";
import type { User } from "@/lib/types";

export async function createUser(data: NewUserForm) {
  return await api.post<User>("/users", data)
}

export async function login(data: any) {
  return await api.post("/auth/login", data)
}
