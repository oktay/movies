import { Buy, Flatrate, Rent } from "@/tmdb/models"

import { ProviderLogo } from "@/components/provider-logo"

export const ProviderCard: React.FC<Flatrate | Buy | Rent> = ({
  logo_path,
  provider_name: name,
}) => {
  return (
    <div className="flex items-center rounded-md border">
      <div className="relative aspect-square w-12">
        <ProviderLogo image={logo_path} alt={name} className="rounded-md" />
      </div>
      <p className="px-4">{name}</p>
    </div>
  )
}
