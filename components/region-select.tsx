import { regions } from "@/config"
import { SelectProps } from "@radix-ui/react-select"
import ReactCountryFlag from "react-country-flag"

import { getRegion } from "@/lib/get-region"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { setRegion } from "@/app/actions"

export const RegionSelect: React.FC<SelectProps> = ({
  value,
  onValueChange,
  ...props
}) => {
  const region = getRegion()

  return (
    <Select value={region} onValueChange={setRegion} {...props}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region.iso_3166_1} value={region.iso_3166_1}>
            <div className="flex items-center gap-2">
              <ReactCountryFlag countryCode={region.iso_3166_1} svg />
              {region.english_name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
