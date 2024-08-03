interface useMultiSelectProps {
  value?: string
  logic: "and" | "or"
  onChange: (value: string) => void
}

export const useMultiSelect = ({
  value,
  logic,
  onChange,
}: useMultiSelectProps) => {
  const operator = logic === "and" ? "," : "|"
  const selection = value ? value.split(operator).map(Number) : []

  const removeSelection = (id: number) => {
    return selection.filter((genre) => genre !== id).join(operator)
  }

  const addSelection = (id: number) => {
    return [...selection, id].join(operator)
  }

  const clearSelection = () => {
    onChange("")
  }

  const toggleSelection = (id: number) => {
    onChange(selection.includes(id) ? removeSelection(id) : addSelection(id))
  }

  return {
    selection,
    clearSelection,
    toggleSelection,
  }
}
