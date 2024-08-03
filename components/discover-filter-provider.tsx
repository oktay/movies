import { useMultiSelect } from "@/hooks"
import { WatchProvider } from "@/tmdb/models"
import { Check, ChevronsUpDown, Info } from "lucide-react"

import { cn, joiner } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
  const { selection, toggleSelection } = useMultiSelect({
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
          role="combobox"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full justify-between text-left",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <span className="line-clamp-1">{comboboxValue}</span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </PopoverTrigger>

        <PopoverContent align="start" className="p-0 md:w-80">
          <ProviderList
            providers={providers}
            selection={selection}
            toggleSelection={toggleSelection}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const ProviderTooltip = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Info className="ml-2 size-4" />
      </TooltipTrigger>
      <TooltipContent className="w-60">
        Currently showing providers are available in your region. You can change
        your region in the settings.
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const ProviderItem = ({
  provider: { provider_id: id, provider_name: name, logo_path },
  seleceted,
  toggleSelection,
}: {
  provider: WatchProvider
  seleceted: boolean
  toggleSelection: (value: number) => void
}) => {
  return (
    <CommandItem key={id} value={name} onSelect={() => toggleSelection(id)}>
      <Check
        className={cn("mr-2 size-4", seleceted ? "opacity-100" : "opacity-0")}
      />

      <span className="relative mr-2 size-4">
        <ProviderLogo
          image={logo_path}
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
}: {
  providers: WatchProvider[]
  selection: number[]
  toggleSelection: (value: number) => void
}) => {
  return (
    <Command>
      <CommandInput placeholder="Search providers..." />
      <CommandList className="overflow-y-auto">
        <CommandEmpty>No provider found.</CommandEmpty>
        <CommandGroup>
          {providers.map((provider) => (
            <ProviderItem
              key={provider.provider_id}
              provider={provider}
              seleceted={selection.includes(provider.provider_id)}
              toggleSelection={toggleSelection}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
