'use client'

import React, { useEffect } from 'react'
import { EditorContent } from '@tiptap/react'
import { getHtmlRenderClass } from '@/constants/setting/editor'
import useCommonEditor, { ImageList } from '@/hooks/useCommonEditor'
import EditorMenuBar from './EditorMenuBar'
import { CustomImage } from '@/components/ui/CustomImage'

interface CommonEditorProps {
  onChange?: (html: string) => void
  content?: string
  onImageAdded?: (imageList: ImageList[]) => void
}

const CommonEditor = ({
  onChange,
  content,
  onImageAdded,
}: CommonEditorProps) => {
  const {
    editor,
    html,
    imageList,
    fileInputRef,
    editorBottomRef,
    handleImageUpload,
  } = useCommonEditor({ content, onChange })

  /**
   * 수정
   */
  // 1. 새 콘텐츠 추가 시 자동 스크롤

  useEffect(() => {
    if (onImageAdded) onImageAdded(imageList)
  }, [imageList, onImageAdded])

  // 에디터 영역 클릭 시 포커스 설정
  const handleEditorClick = () => {
    if (editor) {
      editor.commands.focus()
    }
  }

  return (
    <div>
      {/* 에디터 */}
      <div className="rounded-md border bg-white">
        <EditorMenuBar
          editor={editor}
          fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
          handleImageUpload={handleImageUpload}
        />
        <EditorContent
          editor={editor}
          className={`tiptap min-h-[200px] cursor-text px-3 py-2 focus:outline-none ${getHtmlRenderClass()}`}
          content={content}
          onClick={handleEditorClick}
        />
        <div ref={editorBottomRef} />
      </div>

      {/* 2. 미리보기 영역 - 스타일링 개선 */}
      <div className="mt-6">
        <div className="mb-2 font-bold text-gray-700">미리보기</div>
        <div
          className={`rounded border bg-gray-50 p-4 ${getHtmlRenderClass()}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {/* 3. 이미지 리스트 */}
      <div className="mt-6">
        <div className="mb-2 font-bold text-gray-700">본문에 추가된 이미지</div>
        <div className="flex flex-wrap gap-4">
          {imageList.length === 0 && (
            <span className="text-gray-400">이미지가 없습니다.</span>
          )}
          {imageList.map((image, idx) => (
            <div key={image.src + idx} className="relative h-32 w-32">
              <CustomImage
                src={image.src}
                alt={`본문 이미지 ${idx + 1}`}
                width={128}
                height={128}
                className="h-32 w-32 rounded border object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommonEditor
