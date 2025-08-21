import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { twMerge } from "tailwind-merge";

interface VerticalAlignOption {
  value: string;
  label: string;
  icon: string; // 이모지 또는 아이콘 텍스트
}

interface EditorVerticalAlignSelectProps {
  editor: Editor | null;
  onVerticalAlignChange?: (align: string) => void;
}

const EditorVerticalAlignSelect = ({
  editor,
  onVerticalAlignChange,
}: EditorVerticalAlignSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedAlign, setSelectedAlign] = useState("v-middle");
  const ref = useRef<HTMLDivElement>(null);

  const verticalAlignOptions: VerticalAlignOption[] = [
    {
      value: "v-top",
      label: "상단 정렬",
      icon: "⬆️",
    },
    {
      value: "v-middle",
      label: "중앙 정렬",
      icon: "↕️",
    },
    {
      value: "v-bottom",
      label: "하단 정렬",
      icon: "⬇️",
    },
  ];

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleVerticalAlignChange = (align: string) => {
    if (!editor) return;

    setSelectedAlign(align);
    setOpen(false);

    // 부모 컴포넌트에 변경 알림
    onVerticalAlignChange?.(align);

    // 테이블 셀에 수직 정렬 클래스 적용 (TipTap v2 방식)
    editor
      .chain()
      .focus()
      .updateAttributes("tableCell", { class: `${align}` })
      .run();
  };

  const selectedOption = verticalAlignOptions.find((opt) => opt.value === selectedAlign);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        className="flex h-8 w-full items-center gap-2 rounded border bg-gray-100 px-3 text-sm hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg">{selectedOption?.icon}</span>
        <span>{selectedOption?.label}</span>
        <span className="text-gray-400">
          <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-0 z-[100] mt-2 min-w-[120px] rounded border bg-white shadow-lg">
          {verticalAlignOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={twMerge(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100",
                selectedAlign === option.value ? "bg-gray-100" : ""
              )}
              onClick={() => handleVerticalAlignChange(option.value)}
            >
              <span className="text-lg">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditorVerticalAlignSelect;
