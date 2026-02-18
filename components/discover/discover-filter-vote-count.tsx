import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface DiscoverFilterVoteCountProps {
  value: string
  onChange: (value: string) => void
}

export const DiscoverFilterVoteCount: React.FC<
  DiscoverFilterVoteCountProps
> = ({ value: initialValue, onChange }) => {
  const value = initialValue ? parseInt(initialValue) : 0

  const handleValueChange = (value: number[]) => {
    onChange(value.toString())
  }

  return (
    <div className="space-y-4">
      <Label className="text-muted-foreground">Minimum Votes</Label>

      <Slider
        min={0}
        max={500}
        step={500 / 10}
        value={[value]}
        onValueChange={handleValueChange}
      />

      <div className="mt-4 flex justify-between border-t">
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} className="relative pt-2">
            <span
              className={cn(
                "text-[9px]",
                value !== i * 50 && "text-muted-foreground"
              )}
            >
              {i * 50}
            </span>
            <span className="absolute left-1/2 top-0 block h-1/3 w-px bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
