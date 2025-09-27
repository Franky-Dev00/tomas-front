import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  toggleIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  isVisible: Boolean
}

export default function ShowPassword({ toggleIsVisible, isVisible }: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      tabIndex={-1}
      size="sm"
      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      onClick={() => toggleIsVisible(!isVisible)}
    >
      {isVisible ? (
        <EyeOff className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Eye className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>

  )
}

