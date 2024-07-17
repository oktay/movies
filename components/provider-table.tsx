import React from "react"
import { Buy, Flatrate, Rent } from "@/tmdb/models"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProviderLogo } from "@/components/provider-logo"

interface ProviderTableProps {
  title: string
  providers: (Flatrate | Buy | Rent)[]
}

export const ProviderTable: React.FC<ProviderTableProps> = ({
  title,
  providers,
}) => {
  return (
    <Table className="border bg-accent/10">
      <TableHeader className="bg-background/50">
        <TableRow>
          <TableHead colSpan={2}>{title}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {providers?.map((provider) => (
          <TableRow key={provider.provider_id}>
            <TableCell className="w-8 py-3">
              <div className="relative aspect-square w-8">
                <ProviderLogo
                  image={provider.logo_path}
                  alt={provider.provider_name}
                  className="rounded-md border"
                />
              </div>
            </TableCell>
            <TableCell className="select-none">
              {provider.provider_name}
            </TableCell>
          </TableRow>
        ))}

        {!providers?.length && (
          <TableRow>
            <TableCell colSpan={2} className="text-muted-foreground">
              Not available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
