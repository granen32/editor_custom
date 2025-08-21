'use client'
import { ButtonHTMLAttributes, useState, useCallback } from 'react'
import CustomLink from './CustomLink'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  href?: string
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  href,
  onClick,
  ...props
}: ButtonProps) {
  const [isActive, setIsActive] = useState(false)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!onClick) return
      if (disabled || isLoading) return

      setIsActive(prev => !prev)
      onClick(e)
    },
    [onClick, disabled, isLoading]
  )

  const baseStyles =
    'inline-flex whitespace-nowrap items-center h-[36px] rounded-lg text-[14px] font-medium transition-all duration-200 disabled:bg-[#A5ADBA] disabled:cursor-not-allowed disabled:text-white'

  const getOutlineStyles = () => {
    if (!onClick) {
      return 'border border-[#B3BAC5] bg-white text-gray-700'
    }
    return `group border border-[#B3BAC5] bg-white text-gray-700 hover:bg-[#42526E] hover:border-[#42526E] hover:text-white  focus:ring-primary/50
      ${
        isActive
          ? 'bg-[#B3BAC5] border-primary text-primary [&>*]:text-primary [&_svg]:text-primary'
          : ''
      }`
  }

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-light focus:ring-primary/50',
    secondary:
      'bg-subtitle-bg text-white hover:bg-primary-hover focus:ring-secondary/50',
    outline: getOutlineStyles(),
  }

  const sizes = {
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
  }

  const buttonClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
    isLoading ? 'cursor-not-allowed opacity-70' : ''
  } ${className}`

  const content = isLoading ? (
    <div className="flex items-center justify-center">
      <svg
        className="mr-2 h-4 w-4 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>Loading...</span>
    </div>
  ) : (
    children
  )

  if (href) {
    return (
      <CustomLink href={href} className={buttonClassName}>
        {content}
      </CustomLink>
    )
  }

  return (
    <button
      className={buttonClassName}
      disabled={isLoading || disabled}
      onClick={onClick ? handleClick : undefined}
      {...props}
    >
      {content}
    </button>
  )
}
