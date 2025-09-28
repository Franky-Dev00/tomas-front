import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Props = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ query, setQuery }: Props) {

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar diseños..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>

  )
}
