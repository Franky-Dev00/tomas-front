import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback, useRef } from "react";

type Props = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setDebouncedQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ query, setQuery, setDebouncedQuery }: Props) {

  const timeoutRef = useRef<number | undefined>(null)

  const debouncedSetQuery = useCallback((value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(value)
    }, 300)
  }, [setQuery])


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    debouncedSetQuery(e.target.value)

  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar diseños..."
          value={query}
          onChange={handleChange}
          className="pl-10"
        />
      </div>
    </div>

  )
}
