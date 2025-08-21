interface Option {
  value: string
  label: string
}

interface RadioGroupProps {
  name: string
  value: string
  options: Option[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
  label?: string
}

const RadioGroup = ({
  name,
  value,
  options,
  onChange,
  className,
  disabled,
}: RadioGroupProps) => {
  const checkedValue = value ?? options[0]?.value
  return (
    <div className={`flex gap-4 ${className ?? ''}`}>
      {options.map(option => (
        <label key={option.value} className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={checkedValue === option.value}
            onChange={onChange}
            className="h-4 w-4"
            disabled={disabled}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}

export default RadioGroup
