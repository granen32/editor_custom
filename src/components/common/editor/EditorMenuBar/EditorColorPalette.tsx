import { Editor } from "@tiptap/core";
import React, { useState, useRef, useEffect } from "react";

interface EditorColorPaletteProps {
  editor: Editor | null;
}

// 약관동의 에디터용 컬러 팔레트
const TERMS_COLOR_PALETTE = [
  { name: "기본", color: "#505F79" },
  { name: "빨강", color: "#FF0000" },
  { name: "파랑", color: "#0000FF" },
  { name: "초록", color: "#008000" },
  { name: "보라", color: "#800080" },
  { name: "주황", color: "#FFA500" },
  { name: "회색", color: "#808080" },
  { name: "갈색", color: "#A52A2A" },
  { name: "핑크", color: "#FFC0CB" },
  { name: "검정", color: "#000000" },
];

const EditorColorPalette = ({ editor }: EditorColorPaletteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#505F79");
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // HSL을 RGB로 변환
  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  };

  // RGB를 HSL로 변환
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let l = 0;
    let s = 0;
    l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // 색상 업데이트
  const updateColor = (newHue?: number, newSaturation?: number, newLightness?: number) => {
    const h = newHue ?? hue;
    const s = newSaturation ?? saturation;
    const l = newLightness ?? lightness;

    const rgb = hslToRgb(h, s, l);
    const color = `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`;

    setSelectedColor(color);
    setRed(rgb.r);
    setGreen(rgb.g);
    setBlue(rgb.b);

    if (editor) {
      editor.chain().focus().setColor(color).run();
    }
  };

  // RGB 값 변경 시 색상 업데이트
  const handleRgbChange = (type: "r" | "g" | "b", value: number) => {
    const newR = type === "r" ? value : red;
    const newG = type === "g" ? value : green;
    const newB = type === "b" ? value : blue;

    const hsl = rgbToHsl(newR, newG, newB);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);

    const color = `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    setSelectedColor(color);
    setRed(newR);
    setGreen(newG);
    setBlue(newB);

    if (editor) {
      editor.chain().focus().setColor(color).run();
    }
  };

  // 미리 정의된 색상 선택
  const handlePresetColorSelect = (color: string) => {
    setSelectedColor(color);
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const hsl = rgbToHsl(r, g, b);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
    setRed(r);
    setGreen(g);
    setBlue(b);

    if (editor) {
      editor.chain().focus().setColor(color).run();
    }
  };

  // 채도/명도 영역 클릭 처리
  const handleSaturationLightnessClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSaturation = Math.round((x / rect.width) * 100);
    const newLightness = Math.round((1 - y / rect.height) * 100);
    setSaturation(newSaturation);
    setLightness(newLightness);
    updateColor(undefined, newSaturation, newLightness);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      {/* 컬러 선택 버튼 */}
      <button
        type="button"
        className="flex h-8 items-center gap-2 rounded border bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
        title="텍스트 색상 선택"
      >
        <div className="h-4 w-4 rounded border" style={{ backgroundColor: selectedColor }} />
        <span>색상</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 컬러 피커 드롭다운 */}
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-[250px] rounded border bg-white p-4 shadow-lg">
          {/* 미리 정의된 색상 */}
          <div className="mb-4">
            <label className="mb-2 block text-xs font-medium text-gray-700">빠른 선택</label>
            <div className="grid grid-cols-6 gap-2">
              {TERMS_COLOR_PALETTE.map((colorOption) => (
                <button
                  key={colorOption.name}
                  type="button"
                  className="group relative h-8 w-8 rounded border hover:scale-110"
                  style={{ backgroundColor: colorOption.color }}
                  onClick={() => handlePresetColorSelect(colorOption.color)}
                  title={colorOption.name}
                >
                  {selectedColor === colorOption.color && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-white drop-shadow"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            {/* 채도/명도 선택 영역 */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-gray-700">색상 선택</label>
              <div
                className="relative h-32 w-full cursor-crosshair rounded border"
                style={{
                  background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
                }}
                onClick={handleSaturationLightnessClick}
              >
                {/* 현재 선택 위치 표시 */}
                <div
                  className="absolute h-3 w-3 -translate-x-1.5 -translate-y-1.5 rounded-full border-2 border-white shadow"
                  style={{
                    left: `${saturation}%`,
                    top: `${100 - lightness}%`,
                  }}
                />
              </div>
            </div>
            {/* RGB 입력 필드 */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-gray-700">RGB 값</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={red}
                    onChange={(e) => handleRgbChange("r", parseInt(e.target.value) || 0)}
                    className="w-full rounded border px-2 py-1 text-xs"
                    placeholder="R"
                  />
                  <div className="text-center text-xs text-gray-500">R</div>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={green}
                    onChange={(e) => handleRgbChange("g", parseInt(e.target.value) || 0)}
                    className="w-full rounded border px-2 py-1 text-xs"
                    placeholder="G"
                  />
                  <div className="text-center text-xs text-gray-500">G</div>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={blue}
                    onChange={(e) => handleRgbChange("b", parseInt(e.target.value) || 0)}
                    className="w-full rounded border px-2 py-1 text-xs"
                    placeholder="B"
                  />
                  <div className="text-center text-xs text-gray-500">B</div>
                </div>
              </div>
            </div>

            {/* 현재 색상 미리보기 */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded border" style={{ backgroundColor: selectedColor }} />
              <span className="font-mono text-sm">{selectedColor}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorColorPalette;
