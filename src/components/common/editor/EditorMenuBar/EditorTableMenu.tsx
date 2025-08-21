import React from "react";
import { Editor } from "@tiptap/react";
import { tableMenuItems } from "@/constants/setting/editor";
import { CustomImage } from "@/components/ui/CustomImage";
import InsertImage from "@/assets/svg/editor/ico_editor_insertimage.svg";
interface EditorTableMenuProps {
  editor: Editor | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorTableMenu = ({ editor, fileInputRef, handleImageUpload }: EditorTableMenuProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 bg-gray-50">
      {tableMenuItems.map((item) => {
        const handleTableMenuClick = (item: { name: string; action: (editor: Editor) => void }) => {
          if (!editor) return;
          item.action(editor);
        };
        return (
          <button
            key={item.name}
            type="button"
            className={`rounded border bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200 ${
              editor?.isActive(item.name) ? "bg-gray-200" : ""
            }`}
            onClick={() => handleTableMenuClick(item)}
          >
            <CustomImage
              src={item.icon}
              alt={item.name}
              className="h-5 w-5"
              width={20}
              height={20}
            />
          </button>
        );
      })}
      <button
        type="button"
        className="relative h-8 rounded border bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200"
        onClick={() => fileInputRef.current?.click()}
      >
        <span role="img" aria-label="이미지">
          <CustomImage
            src={InsertImage.src}
            alt="이미지"
            className="h-5 w-5"
            width={20}
            height={20}
          />
        </span>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />
      </button>
    </div>
  );
};

export default EditorTableMenu;
