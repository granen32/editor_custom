import { Editor } from "@tiptap/react";
import CircleList from "@/assets/svg/editor/ico_editor_circlelist.svg";
import NumberList from "@/assets/svg/editor/ico_editor_numberlist.svg";
import Blockquote from "@/assets/svg/editor/ico_editor_blockquote.svg";
import Code from "@/assets/svg/editor/ico_editor_codeblock.svg";
import Link from "@/assets/svg/editor/ico_editor_link.svg";
import Bold from "@/assets/svg/editor/ico_editor_bold.svg";
import Italic from "@/assets/svg/editor/ico_editor_italic.svg";
import Underline from "@/assets/svg/editor/ico_editor_underline.svg";
import AlignLeft from "@/assets/svg/editor/ico_editor_alignleft.svg";
import AlignCenter from "@/assets/svg/editor/ico_editor_aligncenter.svg";
import AlignRight from "@/assets/svg/editor/ico_editor_alignright.svg";
import InsertTable from "@/assets/svg/editor/ico_editor_table.svg";
import DeleteTable from "@/assets/svg/editor/ico_editor_deletetable.svg";
import AddColumn from "@/assets/svg/editor/ico_editor_addcolumn.svg";
import AddRow from "@/assets/svg/editor/ico_editor_addrow.svg";
import DeleteColumn from "@/assets/svg/editor/ico_editor_deletecolumn.svg";
import DeleteRow from "@/assets/svg/editor/ico_editor_deleterow.svg";
import TableHeader from "@/assets/svg/editor/ico_editor_tableheader.svg";
import MergeOrSplit from "@/assets/svg/editor/ico_editor_mergeorsplit.svg";

export interface AlignOptions {
  name: string;
  icon: string;
  action: (editor: Editor) => void;
}

export interface AllMenuOptions {
  align: AlignOptions[];
  menu: AlignOptions[];
  // text: AlignOptions[];
}

export const MENU_ITEMS: AllMenuOptions = {
  align: [
    // 정렬 기능 추가
    {
      name: "left",
      icon: AlignLeft.src,
      action: (editor: Editor) => {
        editor.chain().setTextAlign("left").run();
        // 이미지 컨테이너 div의 정렬 변경
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;

          // 이미지 또는 이미지를 감싸는 div 찾기
          let imageElement = (container as Element).closest("img") as HTMLElement;
          if (!imageElement && container.parentElement) {
            imageElement = container.parentElement.closest("img") as HTMLElement;
          }

          if (imageElement) {
            // 이미지를 감싸는 div 찾기
            const wrapper = imageElement.parentElement;
            if (wrapper && wrapper.tagName === "DIV") {
              wrapper.style.textAlign = "left";
            }
          }
        }
      },
    },
    {
      name: "center",
      icon: AlignCenter.src,
      action: (editor: Editor) => {
        editor.chain().setTextAlign("center").run();
        // 이미지 컨테이너 div의 정렬 변경
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;

          // 이미지 또는 이미지를 감싸는 div 찾기
          let imageElement = (container as Element).closest("img") as HTMLElement;
          if (!imageElement && container.parentElement) {
            imageElement = container.parentElement.closest("img") as HTMLElement;
          }

          if (imageElement) {
            // 이미지를 감싸는 div 찾기
            const wrapper = imageElement.parentElement;
            if (wrapper && wrapper.tagName === "DIV") {
              wrapper.style.textAlign = "center";
            }
          }
        }
      },
    },
    {
      name: "right",
      icon: AlignRight.src,
      action: (editor: Editor) => {
        editor.chain().setTextAlign("right").run();
        // 이미지 컨테이너 div의 정렬 변경
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;

          // 이미지 또는 이미지를 감싸는 div 찾기
          let imageElement = (container as Element).closest("img") as HTMLElement;
          if (!imageElement && container.parentElement) {
            imageElement = container.parentElement.closest("img") as HTMLElement;
          }

          if (imageElement) {
            // 이미지를 감싸는 div 찾기
            const wrapper = imageElement.parentElement;
            if (wrapper && wrapper.tagName === "DIV") {
              wrapper.style.textAlign = "right";
            }
          }
        }
      },
    },
  ],

  menu: [
    {
      name: "bold",
      icon: Bold,
      action: (editor: Editor) => editor.chain().toggleBold().run(),
    },
    {
      name: "italic",
      icon: Italic,
      action: (editor: Editor) => editor.chain().toggleItalic().run(),
    },
    {
      name: "underline",
      icon: Underline,
      action: (editor: Editor) => editor.chain().toggleUnderline().run(),
    },
    {
      name: "bulletList",
      icon: CircleList,
      action: (editor: Editor) => editor.chain().toggleBulletList().run(),
    },
    {
      name: "orderedList",
      icon: NumberList,
      action: (editor: Editor) => editor.chain().toggleOrderedList().run(),
    },
    {
      name: "blockquote",
      icon: Blockquote,
      action: (editor: Editor) => editor.chain().toggleBlockquote().run(),
    },
    {
      name: "codeBlock",
      icon: Code,
      action: (editor: Editor) => editor.chain().toggleCodeBlock().run(),
    },
    {
      name: "link",
      icon: Link,
      action: (editor: Editor) => {
        const url = window.prompt("링크 주소를 입력하세요");
        if (url) editor.chain().setLink({ href: url }).run();
      },
    },
  ],
};

export const tableMenuItems = [
  {
    name: "insertTable",
    icon: InsertTable,
    action: (editor: Editor) => {
      const rows = prompt("행 수를 입력하세요 (기본값: 3)", "3");
      if (rows === null) return; // 취소 버튼을 눌렀을 때

      const cols = prompt("열 수를 입력하세요 (기본값: 3)", "3");
      if (cols === null) return; // 취소 버튼을 눌렀을 때

      const withHeader = confirm("헤더 행을 포함하시겠습니까?");
      // confirm에서 취소를 눌러도 false가 반환되므로 테이블은 생성되지만 헤더는 포함되지 않음

      const rowCount = parseInt(rows || "3");
      const colCount = parseInt(cols || "3");

      editor
        .chain()
        .insertTable({
          rows: rowCount,
          cols: colCount,
          withHeaderRow: withHeader,
        })
        .run();
    },
  },
  {
    name: "deleteTable",
    icon: DeleteTable,
    action: (editor: Editor) => editor.chain().deleteTable().run(),
  },
  {
    name: "addColumnAfter",
    icon: AddColumn,
    action: (editor: Editor) => editor.chain().addColumnAfter().run(),
  },
  {
    name: "deleteColumn",
    icon: DeleteColumn,
    action: (editor: Editor) => editor.chain().deleteColumn().run(),
  },
  {
    name: "addRowAfter",
    icon: AddRow,
    action: (editor: Editor) => editor.chain().addRowAfter().run(),
  },
  {
    name: "deleteRow",
    icon: DeleteRow,
    action: (editor: Editor) => editor.chain().deleteRow().run(),
  },
  {
    name: "toggleHeaderCell",
    icon: TableHeader,
    action: (editor: Editor) => editor.chain().toggleHeaderCell().run(),
  },
  {
    name: "mergeOrSplit",
    icon: MergeOrSplit,
    action: (editor: Editor) => editor.chain().mergeOrSplit().run(),
  },
];

/**
 * 기존 메뉴 아이템
 */
export const menuItems = [
  {
    name: "bold",
    icon: "B",
    action: (editor: Editor) => editor.chain().toggleBold().run(),
  },
  {
    name: "italic",
    icon: "I",
    action: (editor: Editor) => editor.chain().toggleItalic().run(),
  },
  {
    name: "underline",
    icon: "U",
    action: (editor: Editor) => editor.chain().toggleUnderline().run(),
  },
  {
    name: "strike",
    icon: "S",
    action: (editor: Editor) => editor.chain().toggleStrike().run(),
  },
  {
    name: "heading",
    icon: "H1",
    action: (editor: Editor) => editor.chain().toggleHeading({ level: 1 }).run(),
  },
  {
    name: "bulletList",
    icon: "• List",
    action: (editor: Editor) => editor.chain().toggleBulletList().run(),
  },
  {
    name: "orderedList",
    icon: "1. List",
    action: (editor: Editor) => editor.chain().toggleOrderedList().run(),
  },
  {
    name: "blockquote",
    icon: "",
    action: (editor: Editor) => editor.chain().toggleBlockquote().run(),
  },
  {
    name: "codeBlock",
    icon: "<>",
    action: (editor: Editor) => editor.chain().toggleCodeBlock().run(),
  },
  {
    name: "link",
    icon: "🔗",
    action: (editor: Editor) => {
      const url = window.prompt("링크 주소를 입력하세요");
      if (url) editor.chain().setLink({ href: url }).run();
    },
  },
  {
    name: "left",
    icon: "⬅️",
    action: (editor: Editor) => editor.chain().setTextAlign("left").run(),
  },
  {
    name: "center",
    icon: "↔️",
    action: (editor: Editor) => editor.chain().setTextAlign("center").run(),
  },
  {
    name: "right",
    icon: "➡️",
    action: (editor: Editor) => editor.chain().setTextAlign("right").run(),
  },
];

/**
 * 에디터 default block style
 */

// 3. 블록별 구분(스타일)
// prose 태그에 block별 border, margin 등 추가
export const blockStyle =
  "editor-prose min-h-[200px] px-3 py-2 " +
  "[&>p]:mb-2 [&>p]:pb-2 [&_ul]:ml-6 [&_ul]:list-disc [&>ul]:border-b [&>ul]:mb-2 [&>ul]:pb-2 [&>p]:min-h-4" +
  "[&>ol]:border-b [&>ol]:mb-2 [&>ol]:pb-2 [&_ol]:list-decimal [&_ol]:ml-6 " +
  "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:mb-2 [&_blockquote]:pb-2";

// 테이블 스타일 개선 - 에디터 바깥으로 넘어가지 않도록 설정
export const tableStyle = `
    /* 테이블 컨테이너 - 오버플로우 방지 */
    [&_.tableWrapper]:overflow-x-auto [&_.tableWrapper]:max-w-full [&_.tableWrapper]:my-6 [&_.tableWrapper]:table-fixed

    /* 테이블 기본 스타일 */
    [&_table]:border-collapse [&_table]:w-full [&_table]:m-0 [&_table]:table-fixed [&_table]:w-full [&_table]:min-w-0
    [&_table]:border [&_table]:border-gray-300

    /* td, th 공통 */
    [&_td]:border [&_td]:border-gray-300
    [&_td]:box-border [&_td]:min-w-[1em]
    [&_td]:py-[1.5] [&_td]:px-[2]
    [&_td]:relative [&_td]:align-top
    [&_td_>*]:mb-0 [&_td]:max-w-0 [&_td]:overflow-hidden [&_td]:text-ellipsis
    [&_td.v-bottom]:align-bottom
    [&_td.v-middle]:align-middle
    [&_td.v-top]:align-top

    [&_th]:border [&_th]:border-gray-300
    [&_th]:box-border [&_th]:min-w-[1em]
    [&_th]:py-[1.5] [&_th]:px-[2]
    [&_th]:relative [&_th]:align-top
    /* th 전용 */
    [&_th]:bg-gray-100
    [&_th]:font-bold [&_th]:text-left [&_th]:max-w-0 [&_th]:overflow-hidden [&_th]:text-ellipsis

    /* 선택된 셀 배경 (.selectedCell:after) */
    [&_.selectedCell:after]:content-['']
    [&_.selectedCell:after]:absolute [&_.selectedCell:after]:inset-0
    [&_.selectedCell:after]:bg-gray-200
    [&_.selectedCell:after]:pointer-events-none
    [&_.selectedCell:after]:z-20

    /* 컬럼 리사이즈 핸들 (.column-resize-handle) */
    [&_.column-resize-handle]:absolute
    [&_.column-resize-handle]:top-0
    [&_.column-resize-handle]:right-[-2px]
    [&_.column-resize-handle]:bottom-[-2px]
    [&_.column-resize-handle]:w-[4px]
    [&_.column-resize-handle]:bg-purple-500
    [&_.column-resize-handle]:pointer-events-none

    /* 테이블 내 이미지 스타일 */
    [&_table_img]:max-w-full [&_table_img]:h-auto [&_table_img]:object-contain
    [&_table_img]:max-h-[100px] [&_table_img]:w-auto [&_table_img]:display-inline

    /* resize-cursor 모드 */
    resize-cursor:cursor-col-resize

    /* 테이블 내 텍스트 스타일 */
    [&_table_p]:mb-0 [&_table_p]:text-sm [&_table_p]:leading-normal
    [&_table_strong]:font-bold [&_table_strong]:text-gray-900
    [&_table_b]:font-bold [&_table_b]:text-gray-900
    [&_table_em]:italic [&_table_em]:text-gray-800
    [&_table_i]:italic [&_table_i]:text-gray-800
    [&_table_u]:underline [&_table_u]:text-gray-800

    /* 테이블 셀 내부 요소 스타일 */
    [&_td_p]:mb-0 [&_td_p]:text-sm [&_td_p]:leading-normal [&_td_p]:text-gray-800
    [&_th_p]:mb-0 [&_th_p]:text-sm [&_th_p]:leading-normal [&_th_p]:text-gray-900 [&_th_p]:font-bold
    [&_td_strong]:font-bold [&_td_strong]:text-gray-900
    [&_th_strong]:font-bold [&_th_strong]:text-gray-900
    [&_td_b]:font-bold [&_td_b]:text-gray-900
    [&_th_b]:font-bold [&_th_b]:text-gray-900
    [&_td_em]:italic [&_td_em]:text-gray-800
    [&_th_em]:italic [&_th_em]:text-gray-800
    [&_td_i]:italic [&_td_i]:text-gray-800
    [&_th_i]:italic [&_th_i]:text-gray-800
    [&_td_u]:underline [&_td_u]:text-gray-800
    [&_th_u]:underline [&_th_u]:text-gray-800

    /* 테이블 셀 정렬 */
    [&_td.text-left]:text-left
    [&_td.text-center]:text-center
    [&_td.text-right]:text-right
    [&_th.text-left]:text-left
    [&_th.text-center]:text-center
    [&_th.text-right]:text-right
  `;

// HTML 렌더링을 위한 스타일 클래스들
export const htmlRenderStyles = {
  // 기본 컨테이너
  container: "preview-content prose prose-sm max-w-none",

  // 텍스트 스타일
  text: {
    paragraph: "[&_p]:mb-2 [&_p]:leading-relaxed [&_p]:text-gray-800",
    headings: [
      "[&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900",
      "[&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900",
      "[&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900",
      "[&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-gray-900",
      "[&_h5]:mb-2 [&_h5]:text-sm [&_h5]:font-bold [&_h5]:text-gray-900",
      "[&_h6]:mb-2 [&_h6]:text-xs [&_h6]:font-bold [&_h6]:text-gray-900",
    ].join(" "),
    emphasis: [
      "[&_strong]:font-bold [&_strong]:text-gray-900",
      "[&_b]:font-bold [&_b]:text-gray-900",
      "[&_em]:italic [&_em]:text-gray-800",
      "[&_i]:italic [&_i]:text-gray-800",
      "[&_u]:text-gray-800 [&_u]:underline",
    ].join(" "),
    link: "[&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:underline [&_a]:cursor-pointer [&_a]:transition-colors [&_a]:duration-200",
  },

  // 리스트 스타일
  list: [
    "[&_ul]:mb-2 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:text-gray-800",
    "[&_ol]:mb-2 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:text-gray-800",
    "[&_li]:mb-1",
  ].join(" "),

  // 블록 요소 스타일
  block: {
    blockquote:
      "[&_blockquote]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pb-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600",
    code: "[&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-gray-700",
    pre: "[&_pre]:mb-2 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:text-gray-700 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:rounded-none",
  },

  // 미디어 스타일
  media: {
    image: "[&_img]:mb-2 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded",
  },

  // 빈 요소 처리
  empty: [
    "[&_div:empty]:mb-2 [&_div:empty]:min-h-[1em]",
    "[&_p:empty]:mb-2 [&_p:empty]:min-h-[1em]",
  ].join(" "),

  // 정렬 스타일
  alignment: [
    "[&_.text-left]:text-left",
    "[&_.text-center]:text-center",
    "[&_.text-right]:text-right",
    "[&_.text-justify]:text-justify",
    // 인라인 스타일 정렬 처리 - 더 정확한 선택자 사용
    "[&_p[style*='text-align: left']]:text-left",
    "[&_p[style*='text-align: center']]:text-center",
    "[&_p[style*='text-align: right']]:text-right",
    "[&_p[style*='text-align: justify']]:text-justify",
    "[&_h1[style*='text-align: left']]:text-left",
    "[&_h1[style*='text-align: center']]:text-center",
    "[&_h1[style*='text-align: right']]:text-right",
    "[&_h1[style*='text-align: justify']]:text-justify",
    "[&_h2[style*='text-align: left']]:text-left",
    "[&_h2[style*='text-align: center']]:text-center",
    "[&_h2[style*='text-align: right']]:text-right",
    "[&_h2[style*='text-align: justify']]:text-justify",
    "[&_h3[style*='text-align: left']]:text-left",
    "[&_h3[style*='text-align: center']]:text-center",
    "[&_h3[style*='text-align: right']]:text-right",
    "[&_h3[style*='text-align: justify']]:text-justify",
    "[&_h4[style*='text-align: left']]:text-left",
    "[&_h4[style*='text-align: center']]:text-center",
    "[&_h4[style*='text-align: right']]:text-right",
    "[&_h4[style*='text-align: justify']]:text-justify",
    "[&_h5[style*='text-align: left']]:text-left",
    "[&_h5[style*='text-align: center']]:text-center",
    "[&_h5[style*='text-align: right']]:text-right",
    "[&_h5[style*='text-align: justify']]:text-justify",
    "[&_h6[style*='text-align: left']]:text-left",
    "[&_h6[style*='text-align: center']]:text-center",
    "[&_h6[style*='text-align: right']]:text-right",
    "[&_h6[style*='text-align: justify']]:text-justify",
    // 테이블 셀 인라인 스타일 정렬
    "[&_td[style*='text-align: left']]:text-left",
    "[&_td[style*='text-align: center']]:text-center",
    "[&_td[style*='text-align: right']]:text-right",
    "[&_th[style*='text-align: left']]:text-left",
    "[&_th[style*='text-align: center']]:text-center",
    "[&_th[style*='text-align: right']]:text-right",
  ].join(" "),
};

// 전체 HTML 렌더링 스타일 클래스 생성 함수
export const getHtmlRenderClass = () => {
  return [
    htmlRenderStyles.container,
    htmlRenderStyles.text.paragraph,
    htmlRenderStyles.text.headings,
    htmlRenderStyles.text.emphasis,
    htmlRenderStyles.text.link,
    htmlRenderStyles.list,
    htmlRenderStyles.block.blockquote,
    htmlRenderStyles.block.code,
    htmlRenderStyles.block.pre,
    htmlRenderStyles.media.image,
    htmlRenderStyles.empty,
    htmlRenderStyles.alignment,
    blockStyle,
    tableStyle,
  ].join(" ");
};
