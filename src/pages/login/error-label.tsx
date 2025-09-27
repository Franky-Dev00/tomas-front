import { AlertCircle } from "lucide-react";

type Props = {
  errorMessage?: string
}

export default function LabelError({ errorMessage }: Props) {
  if (!errorMessage) return null
  return (
    <div className="flex items-center gap-1 text-sm text-red-500">
      <AlertCircle className="h-4 w-4" />
      {errorMessage}
    </div>

  )
}
