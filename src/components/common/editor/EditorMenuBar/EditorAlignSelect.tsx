import { CustomImage } from "@/components/ui/CustomImage";
import { AlignOptions } from "@/constants/setting/editor";
import { Editor } from "@tiptap/core";

interface EditorSelectProps {
  options: AlignOptions[];
  editor: Editor | null;
}

const EditorAlignSelect = ({ options, editor }: EditorSelectProps) => {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.name}
          type="button"
          className="h-8 rounded border bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200"
          onClick={() => option.action(editor as Editor)}
        >
          <CustomImage
            src={option.icon}
            alt={option.name}
            className="h-5 w-5"
            width={20}
            height={20}
          />
        </button>
      ))}
    </div>
  );
};

export default EditorAlignSelect;
