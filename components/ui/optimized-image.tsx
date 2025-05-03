"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  loading?: "lazy" | "eager"
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = true,
  quality = 90,
  loading = "eager",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  return (
    <div className="relative">
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          priority={priority}
          quality={quality}
          loading={loading}
          onLoadingComplete={() => setIsLoading(false)}
          onError={handleError}
        />
      ) : (
        <div className={cn(
          "flex items-center justify-center bg-gray-100",
          className
        )}>
          <span className="text-gray-400">Imagem não disponível</span>
        </div>
      )}
      {isLoading && (
        <Skeleton className="absolute inset-0" />
      )}
    </div>
  )
} 