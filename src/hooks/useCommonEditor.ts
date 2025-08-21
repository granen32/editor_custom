'use client'
import { useEffect, useRef, useState } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { CustomTextStyle } from '@/lib/editor/CustomTextStyle'
import Color from '@tiptap/extension-color'
import { toast } from 'react-toastify'
import ListItem from '@tiptap/extension-list-item'
import { BulletList } from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'

import Paragraph from '@tiptap/extension-paragraph'
// 정렬 기능을 위한 확장
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import { CustomTableVertical } from '@/lib/editor/CustomTableVertical'
import { CustomTableWrapper } from '@/lib/editor/CustomTableWrapper'
import Image from '@tiptap/extension-image'
import { CustomIndent } from '@/lib/editor/CustomIndent'

interface CommonEditorProps {
  content?: string
  onChange?: (html: string) => void
}

export interface ImageList {
  src: string
  id: number
}

export default function useCommonEditor({
  content,
  onChange,
}: CommonEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorBottomRef = useRef<HTMLDivElement>(null)
  const [previewUrl, _] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [html, setHtml] = useState('')
  const [imageList, setImageList] = useState<ImageList[]>([])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        listItem: false,
        orderedList: false,
        heading: false, // StarterKit의 기본 heading을 비활성화
      }),
      Underline,
      CustomTextStyle,
      CustomTableVertical.configure({
        HTMLAttributes: {
          class: 'p-2 border border-gray-300',
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          style: 'min-height:16px;',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Color,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6], // H1~H6 모두 지원
        HTMLAttributes: {
          class: 'font-bold text-gray-900',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
          style: 'display: inline-block; vertical-align: baseline;',
        },
        allowBase64: true,
        inline: true,
      }),
      // 리스트 확장들을 더 명확하게 설정
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'mb-1',
        },
      }),
      // 들여쓰기 확장 추가
      CustomIndent,
      // 정렬 기능 추가
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      // 테이블 확장들
      CustomTableWrapper.configure({
        resizable: true,
        handleWidth: 5,
        cellMinWidth: 100,
        lastColumnResizable: true,
        allowTableNodeSelection: true,
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-gray-300',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 font-bold text-left p-2 border border-gray-300',
          style: 'width: auto; min-width: 100px;',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2 text-left table-cell-with-image',
          style: 'width: auto; min-width: 100px; word-wrap: break-word;',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const currentHtml = editor.getHTML()
      setHtml(currentHtml)

      // onChange 콜백 호출
      if (onChange) {
        onChange(currentHtml)
      }

      // 이미지 리스트 업데이트
      const doc = new DOMParser().parseFromString(currentHtml, 'text/html')
      const imgs = Array.from(doc.querySelectorAll('img')).map(img => ({
        src: img.src,
        id: parseInt(img.alt),
      }))
      setImageList(imgs)
    },
    immediatelyRender: false,
    // HTML 콘텐츠 삽입 허용
    parseOptions: {
      preserveWhitespace: 'full',
    },
    // HTML 콘텐츠 삽입을 위한 추가 설정
    enableInputRules: true,
    enablePasteRules: true,
    // 커서 위치 유지를 위한 설정
    editorProps: {
      handleDOMEvents: {
        focus: (view, event) => {
          // 포커스 이벤트에서 커서 위치 강제 이동 방지
          return false
        },
      },
    },
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setIsUploading(true)
    try {
      toast.success('이미지 업로드 성공')
    } catch (err) {
      toast.error('이미지 업로드 실패')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  useEffect(() => {
    if (editor && content) {
      const currentContent = editor.getHTML()
      // content가 실제로 변경되었고, 빈 문자열이 아닌 경우에만 setContent 호출
      if (
        currentContent !== content &&
        currentContent.trim() !== content.trim() &&
        content.trim() !== ''
      ) {
        // setContent 실행 시 preserveWhitespace 옵션으로 커서 위치 유지
        editor.commands.setContent(content, {
          parseOptions: {
            preserveWhitespace: 'full',
          },
        })
      }
    }
  }, [content, editor])

  return {
    editor,
    html,
    imageList,
    previewUrl,
    isUploading,
    fileInputRef,
    editorBottomRef,
    handleImageUpload,
  }
}
