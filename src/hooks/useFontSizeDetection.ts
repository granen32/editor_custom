import { useCallback } from "react";
import { Editor } from "@tiptap/react";

interface FontSizeDetectionResult {
  fontSize: number | null;
  fontSizeClass: string | null;
  isDetected: boolean;
}

// 폰트 크기 상수 정의
const FONT_SIZES = {
  HEADING: {
    1: 24,
    2: 20,
    3: 18,
    4: 16,
    5: 16,
    6: 14,
  },
  DEFAULT: 14,
  TAGS: {
    h1: 24,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 16,
    h6: 14,
    paragraph: 14,
    p: 14,
    orderedList: 14,
    bulletList: 14,
    listItem: 14,
    ol: 14,
    ul: 14,
    li: 14,
    strong: 14,
    bold: 14,
    b: 14,
    span: 14,
    text: 14,
    blockquote: 14,
    code: 14,
    codeBlock: 14,
  },
} as const;

export const useFontSizeDetection = () => {
  // textStyle 마크에서 폰트 크기 추출
  const extractFontSizeFromTextStyle = useCallback((textStyleMark: any): number | null => {
    if (!textStyleMark) return null;

    // class 속성에서 폰트 크기 확인
    if (textStyleMark.attrs.class) {
      const fontSizeMatch = textStyleMark.attrs.class.match(/font-size-(\d+)/);
      if (fontSizeMatch) {
        return parseInt(fontSizeMatch[1]);
      }
    }

    // style 속성에서 폰트 크기 확인
    if (textStyleMark.attrs.style) {
      const fontSizeMatch = textStyleMark.attrs.style.match(/font-size:\s*(\d+)px/);
      if (fontSizeMatch) {
        return parseInt(fontSizeMatch[1]);
      }
    }

    return null;
  }, []);

  // 노드의 style 속성에서 폰트 크기 추출
  const extractFontSizeFromStyle = useCallback((styleValue: string): number | null => {
    const fontSizeMatch = styleValue.match(/font-size:\s*(\d+)px/);
    return fontSizeMatch ? parseInt(fontSizeMatch[1]) : null;
  }, []);

  // heading 태그의 level에 따른 폰트 크기 반환
  const getHeadingFontSize = useCallback((level: number): number => {
    return FONT_SIZES.HEADING[level as keyof typeof FONT_SIZES.HEADING] || FONT_SIZES.HEADING[3];
  }, []);

  // 태그 이름에 따른 폰트 크기 반환
  const getTagFontSize = useCallback((tagName: string): number | null => {
    return FONT_SIZES.TAGS[tagName as keyof typeof FONT_SIZES.TAGS] || null;
  }, []);

  // 현재 선택된 텍스트의 폰트 사이즈 감지
  const detectCurrentFontSize = useCallback(
    (editor: Editor | null): FontSizeDetectionResult => {
      if (!editor) {
        return { fontSize: null, fontSizeClass: null, isDetected: false };
      }

      const { state } = editor;
      const { selection } = state;

      // 1. textStyle 마크에서 폰트 크기 확인
      const textStyleMark = state.schema.marks.textStyle;
      if (textStyleMark) {
        const marks = selection.$from.marks();
        const textStyleMarkInstance = marks.find((mark) => mark.type === textStyleMark);

        if (textStyleMarkInstance) {
          const fontSize = extractFontSizeFromTextStyle(textStyleMarkInstance);
          if (fontSize) {
            return {
              fontSize,
              fontSizeClass: textStyleMarkInstance.attrs.class || textStyleMarkInstance.attrs.style,
              isDetected: true,
            };
          }
        }
      }

      // 2. 현재 노드의 HTML 속성에서 폰트 크기 확인
      const currentTextNode = selection.$from.node();
      if (currentTextNode.attrs.style) {
        const fontSize = extractFontSizeFromStyle(currentTextNode.attrs.style);
        if (fontSize) {
          return {
            fontSize,
            fontSizeClass: currentTextNode.attrs.style,
            isDetected: true,
          };
        }
      }

      // 3. 부모 노드들에서 폰트 크기 확인 (상속된 스타일)
      let parentDepth = selection.$from.depth;
      while (parentDepth > 0) {
        const parentNode = selection.$from.node(parentDepth);
        if (parentNode?.attrs.style) {
          const fontSize = extractFontSizeFromStyle(parentNode.attrs.style);
          if (fontSize) {
            return {
              fontSize,
              fontSizeClass: parentNode.attrs.style,
              isDetected: true,
            };
          }
        }
        parentDepth--;
      }

      // 4. HTML 태그별 기본 폰트 크기 확인
      let depth = selection.$from.depth;
      while (depth >= 0) {
        const node = selection.$from.node(depth);
        const tagName = node.type.name;

        if (tagName === "heading") {
          const level = node.attrs.level || 3;
          const fontSize = getHeadingFontSize(level);
          return {
            fontSize,
            fontSizeClass: `heading-${level}-${fontSize}px`,
            isDetected: true,
          };
        } else {
          const fontSize = getTagFontSize(tagName);
          if (fontSize) {
            return {
              fontSize,
              fontSizeClass: `tag-${tagName}-${fontSize}px`,
              isDetected: true,
            };
          }
        }
        depth--;
      }

      // 5. DOM에서 직접 계산된 스타일 확인
      try {
        const domNode = editor.view.nodeDOM(selection.$from.pos) as HTMLElement;
        if (domNode) {
          const computedStyle = window.getComputedStyle(domNode);
          const fontSize = parseFloat(computedStyle.fontSize);
          if (!isNaN(fontSize)) {
            return {
              fontSize: Math.round(fontSize),
              fontSizeClass: `computed-${fontSize}px`,
              isDetected: true,
            };
          }
        }
      } catch (error) {
        // DOM 접근 실패 시 무시
      }

      return { fontSize: null, fontSizeClass: null, isDetected: false };
    },
    [extractFontSizeFromTextStyle, extractFontSizeFromStyle, getHeadingFontSize, getTagFontSize]
  );

  // DOM 요소에서 직접 폰트 사이즈 측정
  const measureFontSizeFromDOM = useCallback((element: HTMLElement): number => {
    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.fontSize);
    return fontSize;
  }, []);

  // 텍스트 노드에서 폰트 크기 추출
  const extractFontSizeFromTextNode = useCallback(
    (node: any, doc: any, pos: number): number | null => {
      let fontSize: number | null = null;

      // 1. textStyle 마크에서 폰트 크기 확인
      const marks = node.marks;
      marks.forEach((mark: any) => {
        if (mark.type.name === "textStyle") {
          fontSize = extractFontSizeFromTextStyle(mark);
        }
      });

      // 2. 부모 노드에서 폰트 크기 확인 (상속된 스타일)
      if (!fontSize) {
        let depth = 0;
        while (depth < doc.resolve(pos).depth) {
          const parentNode = doc.resolve(pos).node(depth);
          if (parentNode?.attrs.style) {
            fontSize = extractFontSizeFromStyle(parentNode.attrs.style);
            if (fontSize) break;
          }
          depth++;
        }
      }

      // 3. HTML 태그별 기본 폰트 크기 확인
      if (!fontSize) {
        const parentNode = doc.resolve(pos).parent;
        if (parentNode) {
          const tagName = parentNode.type.name;

          if (tagName === "heading") {
            const level = parentNode.attrs.level || 3;
            fontSize = getHeadingFontSize(level);
          } else {
            fontSize = getTagFontSize(tagName);
          }
        }
      }

      return fontSize;
    },
    [extractFontSizeFromTextStyle, extractFontSizeFromStyle, getHeadingFontSize, getTagFontSize]
  );

  // 에디터 내 모든 텍스트의 폰트 사이즈 분석
  const analyzeAllFontSizes = useCallback(
    (editor: Editor | null): Map<number, number> => {
      if (!editor) return new Map();

      const fontSizeCount = new Map<number, number>();
      const { state } = editor;
      const { doc } = state;

      // 문서 전체를 순회하며 폰트 사이즈 카운트
      doc.descendants((node, pos) => {
        if (node.isText) {
          const fontSize = extractFontSizeFromTextNode(node, doc, pos);

          if (fontSize) {
            fontSizeCount.set(
              fontSize,
              (fontSizeCount.get(fontSize) || 0) + (node.text?.length || 0)
            );
          }
        }
      });

      return fontSizeCount;
    },
    [extractFontSizeFromTextNode]
  );

  // 가장 많이 사용된 폰트 사이즈 찾기
  const getMostUsedFontSize = useCallback(
    (editor: Editor | null): number | null => {
      const fontSizeCount = analyzeAllFontSizes(editor);
      if (fontSizeCount.size === 0) return null;

      let maxCount = 0;
      let mostUsedSize = null;

      fontSizeCount.forEach((count, size) => {
        if (count > maxCount) {
          maxCount = count;
          mostUsedSize = size;
        }
      });

      return mostUsedSize;
    },
    [analyzeAllFontSizes]
  );

  return {
    detectCurrentFontSize,
    measureFontSizeFromDOM,
    analyzeAllFontSizes,
    getMostUsedFontSize,
  };
};
