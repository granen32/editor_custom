'use client'

import { useCallback, useState } from 'react'
import CommonEditor from '@/components/common/editor/CommonEditor'

export default function Home() {
  const [data, setData] = useState<{
    content: string
    savedFileIdList: number[]
  }>({
    content: '',
    savedFileIdList: [],
  })
  // 에디터 핸들러
  const handleEditorChange = useCallback((html: string) => {
    setData(prev => ({
      ...prev,
      content: html,
    }))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tiptap 에디터 데모
          </h1>
          <p className="text-gray-600">
            Next.js와 Tailwind CSS로 만든 리치 텍스트 에디터입니다.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <CommonEditor content={data.content} onChange={handleEditorChange} />
        </div>
      </div>
    </div>
  )
}
