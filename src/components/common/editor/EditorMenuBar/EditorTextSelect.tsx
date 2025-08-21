import Select from "@/components/ui/Select";
import { AlignOptions } from "@/constants/setting/editor";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface EditorTextSelectProps {
  options: AlignOptions[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditorTextSelect = ({ options, onChange }: EditorTextSelectProps) => {
  const selectOptions = options.map((option) => ({
    value: option.name,
    label: option.icon?.toString() || "",
  }));

  return (
    <div className="w-full max-w-[60px]">
      <Select
        key={uuidv4()}
        options={selectOptions}
        onChange={onChange}
        className="h-8 w-full bg-gray-100"
        defaultValue={selectOptions[0]?.value ?? ""}
      />
    </div>
  );
};

export default EditorTextSelect;
