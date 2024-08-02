import { languages } from "@/lib"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DiscoverFilterLangProps {
  value: string
  onChange: (value: string) => void
}

export const DiscoverFilterLang: React.FC<DiscoverFilterLangProps> = ({
  value,
  onChange,
}) => {
  const handleValueChange = (value: string) => {
    onChange(value === "all" ? "" : value)
  }

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground">Language</Label>

      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger
          className={cn(
            buttonVariants({ variant: "outline" }),
            "justify-between text-left",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <SelectValue placeholder="Select language..." />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>

          {languages.map((lang) => (
            <SelectItem value={lang.iso_639_1} key={lang.iso_639_1}>
              {lang.english_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
