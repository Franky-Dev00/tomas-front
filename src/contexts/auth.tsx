import { getProfile } from "@/api/auth";
import type { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const AuthContext = createContext<null | User>(null)


type Props = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {

  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: getProfile
  })

  return (
    <AuthContext.Provider value={data ?? null}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
