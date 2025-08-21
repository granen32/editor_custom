import { cn } from "@/utils/twMerge";
import { cva, type VariantProps } from "class-variance-authority";
import React, { InputHTMLAttributes, forwardRef } from "react";

const checkboxVariants = cva(
  "text-primary focus:ring-primary mr-[4px] h-3 w-3 rounded-[4px] border border-checkbox-border bg-checkbox-bg p-[6px] text-[10px]",
  {
    variants: {
      variant: {
        default: "border-gray-light",
        error: "border-red-500",
      },
      size: {
        sm: "h-2 w-2",
        md: "h-3 w-3",
        lg: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof CheckboxVariants | "value"> {
  label?: string;
  error?: string;
  variant?: CheckboxVariants["variant"];
  size?: CheckboxVariants["size"];
  onCheckedChange?: (checked: boolean) => void;
  value?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, value, variant, size, label, error, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    return (
      <div className="flex items-center whitespace-nowrap">
        <input
          type="checkbox"
          className={cn(checkboxVariants({ variant: error ? "error" : variant, size }), className)}
          onChange={handleChange}
          ref={ref}
          checked={value}
          {...props}
        />
        {label && <span className="text-[12px] text-subtitle-bg">{label}</span>}
        {error && <p className="ml-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
export { checkboxVariants };
