'use client'

import { useState } from 'react'
import TiptapEditor from '@/components/TiptapEditor'

export default function Home() {
  const [content, setContent] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tiptap 에디터 데모</h1>
          <p className="text-gray-600">Next.js와 Tailwind CSS로 만든 리치 텍스트 에디터입니다.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="여기에 내용을 입력하세요..."
          />
        </div>

        {content && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">HTML 출력</h2>
            <div className="bg-gray-100 p-4 rounded border">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{content}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
