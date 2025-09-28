import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"


type Props = {
  page?: number
  pages?: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>

}

export default function Pagination({ page, pages, currentPage, setCurrentPage }: Props) {

  if (!pages || !page) return null
  if (pages < 2) return null

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      <div className="flex gap-1">
        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className="w-10"
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages))}
        disabled={currentPage === pages}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
