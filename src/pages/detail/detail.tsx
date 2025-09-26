import { useParams } from "react-router"

type params = {
  id: string
}

export default function Detail() {

  const params = useParams<params>()

  return (
    <main>
      <h1>{`Diseño: ${params.id} `}</h1>
    </main>
  )
}

