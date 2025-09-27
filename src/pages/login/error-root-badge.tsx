import { AlertCircle } from "lucide-react";

type Props = {
  errorMessage?: string
}


export default function RootError({ errorMessage }: Props) {

  if (!errorMessage) return null

  return (
    <div className="p-3 border border-red-200 bg-red-50 rounded-md">
      <div className="flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{errorMessage}</span>
      </div>
    </div>
  )
}
