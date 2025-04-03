import { useId, useState } from "react"
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/src/react/lib/utils"
import { Button } from "@/src/react/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/src/react/components/ui/command"
import { Label } from "@/src/react/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/react/components/ui/popover"

interface Menu {
  value: string;
  label: string;
}

interface SelectSearchWithNewButtonProps {
  menuList: Menu[];
  menuType: string;
  value: string;
  setValue: (value: string) => void;
  onNewItem?: () => void;
  newItemLabel?: string;
}

const SelectSearchWithNewButton = React.forwardRef<
  HTMLDivElement,
  SelectSearchWithNewButtonProps
>(({ menuList, menuType, value, setValue, onNewItem, newItemLabel = "New item" }, ref) => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="*:not-first:mt-2" ref={ref}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? menuList.find(
                  (menu) => menu.value === value
                )?.label
                : menuType}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={`Find ${menuType}...`} />
            <CommandList>
              <CommandEmpty>No {menuType} found.</CommandEmpty>
              <CommandGroup>
                {menuList.map((menu) => (
                  <CommandItem
                    key={menu.value}
                    value={menu.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    {menu.label}
                    {value === menu.value && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => {
                    if (onNewItem) {
                      onNewItem();
                      setOpen(false);
                    }
                  }}
                >
                  <PlusIcon
                    size={16}
                    className="-ms-2 opacity-60"
                    aria-hidden="true"
                  />
                  {newItemLabel}
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
})

SelectSearchWithNewButton.displayName = "SelectSearchWithNewButton"

export default SelectSearchWithNewButton
