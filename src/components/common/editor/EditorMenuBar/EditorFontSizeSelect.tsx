import Select from '@/components/ui/Select'
import React, { useState, useMemo, useEffect } from 'react'
import { Editor } from '@tiptap/react'
import { v4 as uuidv4 } from 'uuid'
import { useFontSizeDetection } from '@/hooks/useFontSizeDetection'

interface EditorFontSizeSelectProps {
  editor: Editor | null
  onFontSizeChange?: (size: number) => void
}

const EditorFontSizeSelect = ({
  editor,
  onFontSizeChange,
}: EditorFontSizeSelectProps) => {
  const { detectCurrentFontSize } = useFontSizeDetection()

  // 폰트 크기 옵션을 메모이제이션
  const fontSizeOptions = useMemo(() => {
    return Array.from({ length: 21 }, (_, index) => {
      const size = 10 + index * 2
      return {
        value: size.toString(),
        label: `${size}px`,
      }
    })
  }, [])

  const [fontSize, setFontSize] = useState(
    fontSizeOptions[0]?.value.toString() ?? '16'
  )

  // 현재 선택된 텍스트의 폰트 사이즈 감지
  useEffect(() => {
    if (!editor) return

    const updateCurrentFontSize = () => {
      const result = detectCurrentFontSize(editor)
      if (result.isDetected && result.fontSize) {
        setFontSize(result.fontSize.toString())
      }
    }

    // 초기 실행
    updateCurrentFontSize()

    // 에디터 업데이트 시마다 실행
    const handleUpdate = () => {
      updateCurrentFontSize()
    }

    editor.on('update', handleUpdate)
    editor.on('selectionUpdate', handleUpdate)

    return () => {
      editor.off('update', handleUpdate)
      editor.off('selectionUpdate', handleUpdate)
    }
  }, [editor, detectCurrentFontSize])

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!editor) return

    const newSize = e.target.value
    const size = parseInt(newSize)

    setFontSize(newSize)

    // 부모 컴포넌트에 폰트 크기 변경 알림
    onFontSizeChange?.(size)

    // 선택된 텍스트가 있는지 확인
    const { selection } = editor.state

    if (selection.empty) {
      // 선택된 텍스트가 없으면 현재 블록 노드의 폰트 크기를 변경
      const currentNode = selection.$from.node()
      const nodeType = currentNode.type.name

      // HTML 태그 노드인 경우 해당 노드의 스타일을 변경
      if (
        [
          'paragraph',
          'heading', // heading 태그 지원 추가
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'orderedList',
          'bulletList',
          'listItem',
          'ol',
          'ul',
          'li',
          'strong',
          'bold',
          'b',
          'span',
          'text',
          'blockquote',
          'code',
          'codeBlock',
        ].includes(nodeType)
      ) {
        editor
          .chain()
          .updateAttributes(nodeType, { style: `font-size: ${size}px` })
          .run()

        console.log(
          `현재 ${nodeType} 태그의 폰트 크기를 ${size}px로 설정했습니다.`
        )
      } else {
        // 전역 폰트 크기 설정
        editor
          .chain()
          .setMark('textStyle', { style: `font-size: ${size}px` })
          .run()

        console.log(`전역 폰트 크기를 ${size}px로 설정했습니다.`)
      }
    } else {
      // 선택된 텍스트가 있으면 해당 텍스트에만 적용
      editor
        .chain()
        .unsetMark('textStyle') // 기존 마크 제거
        .setMark('textStyle', { style: `font-size: ${size}px` }) // 인라인 스타일로 적용
        .run()

      console.log(`선택된 텍스트의 폰트 크기를 ${size}px로 변경했습니다.`)
    }
  }

  return (
    <div className="flex w-full max-w-[80px] flex-row items-center gap-2">
      <Select
        key={uuidv4()}
        options={fontSizeOptions}
        value={detectCurrentFontSize(editor)?.fontSize?.toString() ?? fontSize}
        onChange={handleFontSizeChange}
        className="h-8 w-full bg-gray-100"
      />
    </div>
  )
}

export default EditorFontSizeSelect
