"use client";
import { cn } from "@/utils/twMerge";
import { cva, type VariantProps } from "class-variance-authority";
import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";

const inputVariants = cva(
  "w-full h-[36px] rounded-[4px] border-[1px] border-gray-light text-font-default transition-colors placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-90",
  {
    variants: {
      variant: {
        default: "border-gray-light",
        error: "border-red-500 focus:ring-red-500",
      },
      size: {
        sm: "px-[10px] h-[32px]",
        md: "px-[10px] h-[36px]",
        lg: "px-[10px] h-[40px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type InputVariants = VariantProps<typeof inputVariants>;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputVariants> {
  label?: string;
  error?: string;
  variant?: InputVariants["variant"];
  size?: InputVariants["size"];
  onValueChange?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      onValueChange,
      onChange,
      value,
      defaultValue,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    return (
      <div className="flex w-full flex-row items-center gap-2">
        {label && (
          <label className="min-w-[60px] whitespace-nowrap text-[14px] font-medium text-font-default">
            {label}
          </label>
        )}
        <div className="flex-1">
          <input
            className={cn(inputVariants({ variant: error ? "error" : variant, size }), className)}
            onChange={handleChange}
            ref={ref}
            value={value}
            type={props.type}
            disabled={disabled || readOnly}
            defaultValue={defaultValue}
            {...props}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
export { inputVariants };
