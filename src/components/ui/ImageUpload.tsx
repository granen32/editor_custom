'use client'

import { useState, useEffect } from 'react'
import { CustomImage } from './CustomImage'

interface ImageUploadProps {
  label?: string
  description?: string
  imageSize?: {
    width: number
    height: number
  }
  onChange?: (savedIds: number[], deletedIds: number[]) => void
  defaultImage?: string
  className?: string
  disabled?: boolean
  fileList?: { id: number; name: string; size: number; pathEncoded: string }[]
}

type UploadedImage = {
  id: string
  url: string
  name: string
  size: string
}

const ImageUpload = ({
  label,
  description,
  onChange,
  className,
  disabled,
  fileList,
}: ImageUploadProps) => {
  const [images, setImages] = useState<UploadedImage[]>(
    fileList
      ? fileList.map(file => ({
          id: String(file.id),
          url: file.pathEncoded,
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
        }))
      : []
  )
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  // 삭제는 실제 API 호출 없이 ID만 관리 (필요시 API 연동)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (files.length === 0) return
    try {
      setImages(prev => {
        const next = [
          ...prev,
          ...files.map(file => ({
            id: String(file.name),
            url: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
          })),
        ]
        return next
      })
    } catch {
      alert('업로드 실패')
    }
    e.target.value = ''
  }

  const handleDelete = async (id: string) => {
    setImages(prev => {
      const next = prev.filter(img => img.id !== id)
      setDeletedIds(del => {
        const updated = [...del, id]
        return updated
      })
      return next
    })
  }

  // 파일 확장자 체크 함수
  const isImage = (name: string) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(name)

  // 마지막 파일
  const lastFile = images.length > 0 ? images[images.length - 1] : null

  useEffect(() => {
    onChange?.(
      images.map(img => Number(img.id)),
      deletedIds.map(Number)
    )
  }, [images, deletedIds, onChange])
  useEffect(() => {
    if (fileList) {
      setImages(
        fileList.map(file => ({
          id: String(file.id),
          url: file.pathEncoded,
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
        }))
      )
    }
  }, [fileList])

  return (
    <div className={`flex gap-5 ${className || ''}`}>
      {label && <div className="text-sm font-medium">{label}</div>}

      {/* 마지막 업로드 이미지 미리보기 */}
      <div className="flex items-start gap-4">
        <div className="relative flex h-[120px] w-[190px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
          {lastFile ? (
            isImage(lastFile.name) ? (
              <CustomImage
                src={lastFile.url}
                alt="Preview"
                className="h-full w-full rounded-lg object-contain p-2"
              />
            ) : (
              <div className="text-center">
                <div className="text-2xl text-gray-400">📄</div>
                <div className="text-xs text-gray-500">{lastFile.name}</div>
              </div>
            )
          ) : (
            <div className="text-center">
              <div className="text-2xl text-gray-400">+</div>
              <div className="text-sm text-gray-500">업로드</div>
            </div>
          )}
          {images.length < 4 && (
            <input
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,.gif,.bmp,.webp,.pdf,.doc,.docx,.hwp,.xls,.xlsx"
              disabled={disabled}
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          )}
        </div>
      </div>

      {/* 업로드된 이미지 리스트 (바 형태) */}
      <div className="flex w-full flex-col gap-2">
        {images.map(img => (
          <div
            key={img.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2"
          >
            <div className="flex items-center gap-2">
              {isImage(img.name) ? (
                <CustomImage
                  src={img.url}
                  alt={img.name}
                  width={32}
                  height={32}
                  className="rounded object-cover"
                />
              ) : (
                <span className="text-xl">📄</span>
              )}
              <span className="text-sm text-gray-600">{img.name}</span>
              <span className="text-xs text-gray-400">({img.size})</span>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(img.id)}
              className="ml-2 text-lg font-bold text-gray-400 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {description && (
        <div className="mt-1 text-xs text-gray-400">{description}</div>
      )}
    </div>
  )
}

export default ImageUpload
