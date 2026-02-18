import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface DiscoverFilterVoteAverageProps {
  value: string
  onChange: (value: string) => void
}

export const DiscoverFilterVoteAverage: React.FC<
  DiscoverFilterVoteAverageProps
> = ({ value: initialValue, onChange }) => {
  const value = initialValue ? parseInt(initialValue) : 0

  const handleValueChange = (value: number[]) => {
    onChange(value.toString())
  }

  return (
    <div className="space-y-4">
      <Label className="text-muted-foreground">Vote Average</Label>

      <Slider
        min={0}
        max={10}
        step={1}
        value={[value]}
        onValueChange={handleValueChange}
      />

      <div className="mt-4 flex justify-between border-t">
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} className="relative pt-2">
            <span
              className={cn(
                "text-[9px]",
                value !== i && "text-muted-foreground"
              )}
            >
              {i}
            </span>
            <span className="absolute left-1/2 top-0 block h-1/3 w-px -translate-x-px bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
