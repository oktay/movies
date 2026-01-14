import { Fragment } from "react"
import Link from "next/link"
import { pages } from "@/config"
import { Episode, SeasonDetails, TvShowDetails } from "@/tmdb/models"

import { pad } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface TvSeasonBreadcrumbProps {
  id: string
  showDetails: TvShowDetails
  season: number
  seasonDetails: SeasonDetails
  episodeDetails?: Episode
}

export const TvSeasonBreadcrumb = ({
  id,
  showDetails,
  season,
  seasonDetails,
  episodeDetails,
}: TvSeasonBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`${pages.tv.root.link}/${id}`}>{showDetails.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`${pages.tv.root.link}/${id}/seasons`}>Seasons</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {episodeDetails ? (
            <BreadcrumbLink asChild>
              <Link href={`${pages.tv.root.link}/${id}/seasons/${season}`}>
                {seasonDetails.name}
              </Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{seasonDetails.name}</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {episodeDetails && (
          <Fragment>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {pad(episodeDetails.episode_number)}. {episodeDetails.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
