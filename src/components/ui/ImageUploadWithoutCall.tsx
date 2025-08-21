'use client'

import { ChangeEvent, useState } from 'react'
import { CustomImage } from './CustomImage'

interface ImageUploadProps {
  label?: string
  description?: string
  imageSize?: {
    width: number
    height: number
  }
  onChange?: (file: File) => void
  defaultImage?: string
  className?: string
  disabled?: boolean
}

export default function ImageUploadWithoutCall({
  label,
  description,
  onChange,
  defaultImage,
  className,
  disabled,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null)
  const [fileName, setFileName] = useState<string>('')
  const [fileSize, setFileSize] = useState<string>('')

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Set file info
    setFileName(file.name)
    setFileSize((file.size / 1024).toFixed(2) + ' KB')

    // Call onChange prop if provided
    if (onChange) {
      onChange(file)
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <div className="text-sm font-medium">{label}</div>}
      <div className="flex items-start gap-4">
        <div className="relative flex h-[120px] w-[190px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
          {preview ? (
            <CustomImage
              src={preview}
              alt="Preview"
              width={190}
              height={120}
              className="h-full w-full rounded-lg object-contain p-2"
            />
          ) : (
            <div className="text-center">
              <div className="text-2xl text-gray-400">+</div>
              <div className="text-sm text-gray-500">이미지 업로드</div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            disabled={disabled}
            onChange={handleImageChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
        <div className="flex-1">
          {fileName && (
            <div className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{fileName}</span>
                <span className="text-xs text-gray-400">({fileSize})</span>
              </div>
              {description && (
                <div className="mt-1 text-xs text-gray-400">{description}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
