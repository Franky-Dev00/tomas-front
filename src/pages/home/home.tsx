import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export type Design = {
  id: number
  name: string
  price: number
  images: string[]
}

export type DesignsResponse = {
  designs: Design[]
  has_next: boolean
  has_prev: boolean
  next_page: number | null
  prev_page: number | null
  page: number
  pages: number
  total: number
}

async function getDesigns(): Promise<DesignsResponse> {
  const response = await api.get<DesignsResponse>("/designs")
  return response.data
}

export default function Home() {

  const { error, isLoading, data } = useQuery({
    queryKey: ["designs"],
    queryFn: getDesigns
  })

  if (error) {
    return <div> {error.message}</div>
  }

  return (
    <main>
      <h1> Home </h1>
      {
        isLoading
          ? <p>Loading ...</p>
          : (
            data?.designs.map((design) => (
              <div key={design.id}> {design.name} </div>
            ))
          )
      }
    </main>
  )
}
