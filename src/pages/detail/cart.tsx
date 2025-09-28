import { useState } from "react"

export default function Cart({ name, images }: { name?: string, images?: string[] }) {

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg border">
        <img
          src={images ? images[selectedImage] : "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${selectedImage === index ? "border-primary" : "border-border"
              }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>

  )
}

