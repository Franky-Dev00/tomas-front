import { getDesigns } from "@/api/designs"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import SearchBar from "./search-bar"
import DesignCard from "./design-card"
import Pagination from "./pagination"
import { Link } from "react-router"

export default function Home() {

  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const { error, data } = useQuery({
    queryKey: ["designs", debouncedQuery],
    queryFn: async () => getDesigns(debouncedQuery)
  })

  if (error) {
    return <div> {error.message}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl leading-18 font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Colección anime y manga
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Serigrafia artesanal de la mejor calidad
        </p>
      </div>

      <SearchBar
        query={query}
        setQuery={setQuery}
        setDebouncedQuery={setDebouncedQuery}
        placeholder="Buscar diseño por nombre..."
      />

      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Mostrando {data?.designs.length} de {data?.total} diseños
        </p>
        <div className="text-sm text-muted-foreground">
          Página {data?.page} de {data?.pages}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {data?.designs.map((design) => (
          <Link to={`/diseño/${design.id}`} key={design.id}>
            <DesignCard design={design} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={data?.pages}
        page={data?.page}
      />
    </div>)
}
