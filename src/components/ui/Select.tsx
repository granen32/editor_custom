import { cn } from '@/utils/twMerge'
import { SelectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface Option {
  value: string | number
  label: string
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: Option[]
  className?: string
  size?: 'sm' | 'md' | 'lg'
  isLabel?: boolean
  label?: string
  readOnly?: boolean
  value?: string
  defaultValue?: string
}

const sizeClasses = {
  sm: 'h-[24px] px-[10px]',
  md: 'h-[36px] px-[10px]',
  lg: 'h-[48px] px-[10px]',
}

const Select = ({
  options,
  className = '',
  size = 'md',
  label,
  readOnly,
  value,
  defaultValue,
  ...props
}: SelectProps) => {
  return (
    <div className={cn('relative flex w-full items-center gap-2', className)}>
      {label && (
        <label className="min-w-[60px] whitespace-nowrap text-[14px] font-medium text-font-default">
          {label}
        </label>
      )}
      <div className="flex-1">
        <select
          className={twMerge(
            'w-full appearance-none rounded-[4px] border-[1px] border-gray-light pr-8 text-[14px] text-font-default transition-colors placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-90',
            sizeClasses[size],
            className
          )}
          value={value}
          defaultValue={defaultValue ?? value}
          disabled={readOnly}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Select
