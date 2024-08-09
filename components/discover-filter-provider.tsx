import { useMultiSelect } from "@/hooks"
import { WatchProvider } from "@/tmdb/models"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn, joiner } from "@/lib/utils"
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
import { InfoTooltip } from "@/components/info-tooltip"
import { ProviderLogo } from "@/components/provider-logo"

interface DiscoverFilterGenreProps {
  value: string
  providers: WatchProvider[]
  onChange: (value: string) => void
}

export const DiscoverFilterProvider: React.FC<DiscoverFilterGenreProps> = ({
  value,
  providers,
  onChange,
}) => {
  const { selection, toggleSelection, clearSelection } = useMultiSelect({
    value,
    logic: "or",
    onChange,
  })

  const selectedProviders = selection.map((id: number) => {
    return providers.find((item) => item.provider_id === id)
  })

  const comboboxValue = value
    ? joiner(selectedProviders, "provider_name")
    : "Select providers..."

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-muted-foreground">
        Where to watch
        <InfoTooltip className="w-60">
          Currently showing providers are available in your region. You can
          change your region in the settings.
        </InfoTooltip>
      </Label>
      <Popover>
        <PopoverTrigger
          className={cn(value ? "text-foreground" : "text-muted-foreground")}
          role="combobox"
          asChild
        >
          <Button
            variant="outline"
            className="w-full justify-between text-left"
          >
            <span className="line-clamp-1">{comboboxValue}</span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="p- w-64 md:w-80">
          <ProviderList
            providers={providers}
            selection={selection}
            toggleSelection={toggleSelection}
            clearSelection={clearSelection}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const ProviderItem = ({
  provider,
  selected,
  toggleSelection,
}: {
  provider: WatchProvider
  selected: boolean
  toggleSelection: (value: number) => void
}) => {
  const { provider_id: id, provider_name: name, logo_path: logo } = provider

  return (
    <CommandItem key={id} value={name} onSelect={() => toggleSelection(id)}>
      <Check
        className={cn("mr-2 size-4", selected ? "opacity-100" : "opacity-0")}
      />

      <span className="relative mr-2 size-4">
        <ProviderLogo
          image={logo}
          alt={name}
          className="rounded-md"
          size="w45"
        />
      </span>

      {name}
    </CommandItem>
  )
}

const ProviderList = ({
  providers,
  selection,
  toggleSelection,
  clearSelection,
}: {
  providers: WatchProvider[]
  selection: number[]
  toggleSelection: (value: number) => void
  clearSelection: () => void
}) => {
  return (
    <Command>
      <CommandInput placeholder="Search providers..." />
      <CommandList>
        <CommandEmpty>No provider found.</CommandEmpty>

        <CommandGroup>
          <ScrollArea className="max-h-40 overflow-y-auto">
            {providers.map((provider) => (
              <ProviderItem
                key={provider.provider_id}
                provider={provider}
                selected={selection.includes(provider.provider_id)}
                toggleSelection={toggleSelection}
              />
            ))}
          </ScrollArea>
        </CommandGroup>

        {selection.length > 0 && (
          <CommandGroup className="border-t bg-background">
            <CommandItem
              className="justify-center"
              onSelect={() => clearSelection()}
            >
              Clear selection
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}
