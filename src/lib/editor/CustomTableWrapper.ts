import { Table } from "@tiptap/extension-table";

export const CustomTableWrapper = Table.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      // 테이블 기본 설정
      HTMLAttributes: {
        class: "w-full border-collapse border border-gray-300 table-fixed mb-4",
      },
      // 테이블 셀 포커스 관리 개선
      handleWidth: 5,
      cellMinWidth: 100,
      resizable: false,
      // 커서 위치 유지를 위한 설정
      lastColumnResizable: true,
      // 테이블 노드 선택 허용 (셀 선택을 위해 필요)
      allowTableNodeSelection: true,
      // 셀 선택 기능 활성화
      cellSelection: true,
    };
  },
});
