'use client'

import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import { cn } from '@/utils/twMerge'
import { Spinner } from '@/components/ui/Spinner'

interface CustomImageProps extends React.ComponentProps<typeof NextImage> {
  fallback?: React.ReactNode
  showSpinnerOnOriginMismatch?: boolean
  priority?: boolean
  quality?: number
  sizes?: string
  blurDataURL?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  placeholder?: 'blur' | 'empty'
}

export function CustomImage({
  src,
  className,
  fallback,
  showSpinnerOnOriginMismatch = true,
  priority = false,
  quality = 75,
  sizes = '100vw',
  blurDataURL,
  objectFit = 'cover',
  placeholder = 'empty',
  ...props
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(!priority)
  const [error, setError] = useState(false)
  const [originMismatch, setOriginMismatch] = useState(false)

  useEffect(() => {
    if (!src) {
      setError(true)
      return
    }

    if (typeof src === 'string') {
      try {
        const imageDomain = window.location.origin
        const url = new URL(src as string, imageDomain)
        const currentOrigin = imageDomain
        setOriginMismatch(url.origin !== currentOrigin)
      } catch {
        // Local image path
      }
    }
  }, [src])

  if (error) {
    if (fallback) {
      return <>{fallback}</>
    }
    return (
      <div
        className={cn(
          'relative overflow-hidden',
          'flex items-center justify-center',
          'rounded-lg bg-gray-100',
          className
        )}
        style={{ width: props.width, height: props.height }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-1/2 w-1/2 items-center justify-center rounded-full bg-gray-200">
            <svg
              className="h-1/2 w-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  if (originMismatch && showSpinnerOnOriginMismatch) {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <Spinner size="md" />
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <NextImage
        src={src}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          `object-${objectFit}`
        )}
        onLoad={() => {
          setIsLoading(false)
        }}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading="eager"
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Spinner size="md" />
        </div>
      )}
    </div>
  )
}
