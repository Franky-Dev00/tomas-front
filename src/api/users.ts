import type { NewUserForm } from "@/lib/zod-schemas";
import { api } from ".";

export async function createUser(data: NewUserForm) {
  const response = await api.post("/users/", data)
  return response
}
