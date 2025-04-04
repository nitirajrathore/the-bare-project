import { useId } from "react"
import { RadioGroup, RadioGroupItem } from "@/src/react/components/ui/radio-group"

interface CardOption {
  name: string;
  displayName: string;
  description: string;
  image: string;
}

interface RadioCardsProps {
  options: CardOption[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function RadioCards({
  options,
  defaultValue,
  value,
  onChange
}: RadioCardsProps) {
  const id = useId()

  return (
    <RadioGroup
      className="grid grid-cols-3 gap-4"
      defaultValue={defaultValue || options[0]?.name}
      value={value}
      onValueChange={onChange}
    >
      {options.map((option, index) => (
        <div
          key={option.name}
          className="group border-input has-data-[state=checked]:border-ring focus-within:border-ring focus-within:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]"
        >
          <RadioGroupItem
            id={`${id}-${index}`}
            value={option.name}
            className="sr-only"
          />
          <img
            src={`${option.image}`}
            alt={option.displayName}
            className="w-20 h-20 object-contain"
          />
          <label
            htmlFor={`${id}-${index}`}
            className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
          >
            {option.displayName}
          </label>
          <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 p-2 bg-black text-white text-xs rounded-md transition-opacity">
            {option.description}
          </div>
        </div>
      ))}
    </RadioGroup>
  )
}
