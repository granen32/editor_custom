import React, { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { useFontSizeDetection } from "@/hooks/useFontSizeDetection";

interface FontSizeDetectorProps {
  editor: Editor | null;
  showAnalysis?: boolean;
}

const FontSizeDetector: React.FC<FontSizeDetectorProps> = ({ editor, showAnalysis = false }) => {
  const [currentFontSize, setCurrentFontSize] = useState<number | null>(null);
  const [fontSizeAnalysis, setFontSizeAnalysis] = useState<Map<number, number>>(new Map());
  const [mostUsedSize, setMostUsedSize] = useState<number | null>(null);

  const { detectCurrentFontSize, analyzeAllFontSizes, getMostUsedFontSize } =
    useFontSizeDetection();

  useEffect(() => {
    if (!editor) return;

    const updateFontSizeInfo = () => {
      // 현재 선택된 텍스트의 폰트 사이즈 감지
      const currentResult = detectCurrentFontSize(editor);
      setCurrentFontSize(currentResult.fontSize);

      if (showAnalysis) {
        // 전체 문서 분석
        const analysis = analyzeAllFontSizes(editor);
        setFontSizeAnalysis(analysis);

        // 가장 많이 사용된 폰트 사이즈
        const mostUsed = getMostUsedFontSize(editor);
        setMostUsedSize(mostUsed);
      }
    };

    // 초기 실행
    updateFontSizeInfo();

    // 에디터 업데이트 시마다 실행
    const handleUpdate = () => {
      updateFontSizeInfo();
    };

    editor.on("update", handleUpdate);
    editor.on("selectionUpdate", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
      editor.off("selectionUpdate", handleUpdate);
    };
  }, [editor, showAnalysis, detectCurrentFontSize, analyzeAllFontSizes, getMostUsedFontSize]);

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-2 rounded-md border bg-gray-50 p-3">
      <div className="text-sm font-medium text-gray-700">폰트 사이즈 감지</div>

      {/* 현재 선택된 텍스트의 폰트 사이즈 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600">현재 선택:</span>
        {currentFontSize ? (
          <span className="bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs font-medium">
            {currentFontSize}px
          </span>
        ) : (
          <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">기본값</span>
        )}
      </div>

      {/* 분석 정보 표시 */}
      {showAnalysis && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">가장 많이 사용:</span>
            {mostUsedSize ? (
              <span className="bg-green-100 text-green-800 rounded px-2 py-1 text-xs font-medium">
                {mostUsedSize}px
              </span>
            ) : (
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">없음</span>
            )}
          </div>

          {/* 폰트 사이즈별 사용량 */}
          {fontSizeAnalysis.size > 0 && (
            <div className="space-y-1">
              <span className="text-xs text-gray-600">사용량 분석:</span>
              <div className="space-y-1">
                {Array.from(fontSizeAnalysis.entries())
                  .sort(([a], [b]) => a - b)
                  .map(([size, count]) => (
                    <div key={size} className="flex items-center justify-between text-xs">
                      <span className="text-gray-700">{size}px</span>
                      <span className="text-gray-500">{count}자</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FontSizeDetector;
