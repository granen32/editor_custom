import React, { TextareaHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/twMerge";

const textareaVariants = cva(
  "w-full rounded-[4px] border-[1px] border-gray-light text-font-default transition-colors placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-90 resize-none px-[10px] py-[8px]",
  {
    variants: {
      variant: {
        default: "border-gray-light",
        error: "border-red-500 focus:ring-red-500",
      },
      size: {
        sm: "px-[10px] py-[6px]",
        md: "px-[10px] py-[8px]",
        lg: "px-[10px] py-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
  disabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, size, error, disabled, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <textarea
          disabled={disabled}
          className={cn(
            textareaVariants({
              variant: error ? "error" : variant,
              size,
              className,
            })
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
