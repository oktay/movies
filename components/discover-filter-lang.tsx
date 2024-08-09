import { languages } from "@/lib"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DiscoverFilterLangProps {
  value: string
  onChange: (value: string) => void
}

export const DiscoverFilterLang: React.FC<DiscoverFilterLangProps> = ({
  value,
  onChange,
}) => {
  const selected = languages.find(
    (lang) => lang.iso_639_1 === value
  )?.english_name

  return (
    <div className="space-y-2">
      <Label className="flex text-muted-foreground">Language</Label>

      <Popover>
        <PopoverTrigger
          className={cn(value ? "text-foreground" : "text-muted-foreground")}
          asChild
        >
          <Button
            className="w-full justify-between text-left"
            variant="outline"
          >
            {selected || "Select language..."}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-0 md:w-80">
          <LanguageList value={value} onSelect={onChange} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export const LanguageList = ({
  value,
  onSelect,
}: {
  value: string
  onSelect: (value: string) => void
}) => {
  return (
    <Command>
      <CommandInput placeholder="Search.." />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup>
          <ScrollArea className="max-h-40 overflow-y-auto">
            <LanguageOption value="" onSelect={onSelect} selected={!value}>
              All
            </LanguageOption>

            {languages.map((lang) => (
              <LanguageOption
                key={lang.iso_639_1}
                value={lang.iso_639_1}
                onSelect={onSelect}
                selected={value === lang.iso_639_1}
              >
                {lang.english_name}
              </LanguageOption>
            ))}
          </ScrollArea>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const LanguageOption = ({
  value,
  children,
  selected,
  onSelect,
}: {
  value: string
  children: string
  selected: boolean
  onSelect: (value: string) => void
}) => {
  return (
    <CommandItem value={children} key={value} onSelect={() => onSelect(value)}>
      <Check
        className={cn("mr-2 size-4", selected ? "opacity-100" : "opacity-0")}
      />

      {children}
    </CommandItem>
  )
}
