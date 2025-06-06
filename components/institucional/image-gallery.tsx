"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageModal } from "@/components/image-modal"

interface ImageGalleryProps {
  images: {
    image1: string
    image1Alt: string
    image2: string
    image2Alt: string
    image3: string
    image3Alt: string
  }
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
            <Image
              src={images.image1}
              alt={images.image1Alt}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
              onClick={() => setSelectedImage({ src: images.image1, alt: images.image1Alt })}
            />
          </div>
          <div className="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
            <Image
              src={images.image2}
              alt={images.image2Alt}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
              onClick={() => setSelectedImage({ src: images.image2, alt: images.image2Alt })}
            />
          </div>
        </div>
        <div className="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
          <Image
            src={images.image3}
            alt={images.image3Alt}
            width={300}
            height={620}
            className="w-full h-full object-cover"
            onClick={() => setSelectedImage({ src: images.image3, alt: images.image3Alt })}
          />
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ""}
        imageAlt={selectedImage?.alt || ""}
      />
    </>
  )
} 