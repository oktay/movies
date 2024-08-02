import Link from "next/link"
import { Crew } from "@/tmdb/models"

import { MediaCard } from "@/components/media-card"
import { MediaPoster } from "@/components/media-poster"

export const MediaCrewCard: React.FC<Crew> = ({
  id,
  name,
  profile_path,
  job,
}) => (
  <Link href={`/person/${id}`} prefetch={false}>
    <MediaCard.Root>
      <MediaPoster image={profile_path} alt={name} />
      <MediaCard.Content>
        <MediaCard.Title>{name}</MediaCard.Title>
        <MediaCard.Excerpt>{job}</MediaCard.Excerpt>
      </MediaCard.Content>
    </MediaCard.Root>
  </Link>
)
