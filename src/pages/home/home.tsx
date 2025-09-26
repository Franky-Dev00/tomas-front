import { getDesigns } from "@/api/designs"
import { useQuery } from "@tanstack/react-query"

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
