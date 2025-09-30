import { getProfile, logOut } from "@/api/auth"
import { useAuthStore } from "@/store/auth-store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const setAuthUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ["auth-mutation"],
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("Sesión finalizada")
      setAuthUser(null)
      navigate("/")
    }
  })

  const { data, isSuccess } = useQuery({
    queryKey: ["auth"],
    queryFn: getProfile,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (data && isSuccess) {
      setAuthUser(data)
    }
  }, [data, isSuccess])

  function logOutHelper() {
    mutation.mutate()
  }

  return {
    logOutHelper,
    user,
  }
}
