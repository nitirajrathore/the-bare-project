import { useId, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

interface Menu {
  value: string;
  label: string;
}

import { cn } from "@/src/react/lib/utils"
import { Button } from "@/src/react/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/react/components/ui/command"
import { Label } from "@/src/react/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/react/components/ui/popover"

import * as React from "react"

interface SelectWithSearchProps {
  menuList: Menu[];
  menuType: string;
  value: string;
  setValue: (value: string) => void;
}

const SelectWithSearch = React.forwardRef<
  HTMLDivElement,
  SelectWithSearchProps
>(({ menuList, menuType, value, setValue }, ref) => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  // console.log("menuList", menuList)
  // console.log("menuType", menuType)
  return (
    <div className="*:not-first:mt-2" ref={ref}>
      {/* <Label htmlFor={id}>Select {menuType}</Label> */}
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
                ? menuList.find((menu) => menu.value === value)
                  ?.label
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
          side="bottom"
          sideOffset={4}
          avoidCollisions={false}
        >
          <Command>
            <CommandInput placeholder={"Search " + menuType + " ..."} />
            <CommandList>
              <CommandEmpty>No {menuType} found.</CommandEmpty>
              <CommandGroup>
                {menuList.map((menu: Menu) => (
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
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
})

SelectWithSearch.displayName = "SelectWithSearch"

export default SelectWithSearch
