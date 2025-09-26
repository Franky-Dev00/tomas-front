import type { User } from "@/lib/types";
import axios from "axios";

export async function getProfile() {
  // no se usa api por que cuando no hay user se causa un bucle infinito
  const response = await axios.get<User>("/auth/profile")
  return response.data
}
