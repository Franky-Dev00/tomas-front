import { useQuery } from "@tanstack/react-query"

async function getDesigns() {
  const response = await fetch("http://127.0.0.1:5000/designs")
  return await response.json()
}

export default function Home() {

  const { error, isLoading, data } = useQuery({
    queryKey: ["designs"],
    queryFn: getDesigns
  })

  console.log(data)

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
            data.designs.map((design: any, index: number) => (
              <div key={index}> design.name </div>
            ))
          )
      }
    </main>
  )
}
