import { MENU_ITEMS } from "@/constants/setting/editor";
import React from "react";
import { Editor } from "@tiptap/react";
import EditorAlignSelect from "./EditorAlignSelect";
import EditorFontSizeSelect from "./EditorFontSizeSelect";
import EditorColorPalette from "./EditorColorPalette";
import { CustomImage } from "@/components/ui/CustomImage";
import EditorTableMenu from "./EditorTableMenu";
import { cn } from "@/utils/twMerge";
import EditorVerticalAlignSelect from "./EditorVerticalAlignSelect";

interface EditorMenuBarProps {
  editor: Editor | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorMenuBar = ({ editor, fileInputRef, handleImageUpload }: EditorMenuBarProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-t-md border-b bg-gray-50 px-3 py-2 shadow-sm",
        editor?.isActive("table") ? "bg-gray-100" : ""
      )}
    >
      {/* 일반 메뉴 버튼 */}
      {MENU_ITEMS.menu.map((item) => {
        return (
          <button
            key={item.name}
            type="button"
            className={`h-8 rounded border bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200 ${
              editor?.isActive(item.name) ? "bg-gray-200" : ""
            }`}
            onClick={() => item.action(editor as Editor)}
          >
            <CustomImage src={item.icon} alt={item.name} className="h-4 w-4" />
          </button>
        );
      })}

      <EditorFontSizeSelect editor={editor} />
      <EditorColorPalette editor={editor} />
      <EditorVerticalAlignSelect editor={editor} />
      <EditorAlignSelect options={MENU_ITEMS.align} editor={editor} />
      <EditorTableMenu
        editor={editor}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default EditorMenuBar;
