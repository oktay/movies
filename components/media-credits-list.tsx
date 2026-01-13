import { Cast, Crew, GuestStar } from "@/tmdb/models"

import { Badge } from "@/components/ui/badge"
import { MediaCastCard } from "@/components/media-cast-card"
import { MediaCrewCard } from "@/components/media-crew-card"

interface MediaCreditsListProps {
  cast?: Cast[]
  crew?: Crew[]
  guestStars?: GuestStar[]
}

export const MediaCreditsList = ({
  cast = [],
  crew = [],
  guestStars,
}: MediaCreditsListProps) => {
  return (
    <section className="space-y-12">
      <div>
        {cast.length > 0 ? (
          <div className="grid-list">
            {cast.map((cast) => (
              <MediaCastCard key={cast.credit_id} {...cast} />
            ))}
          </div>
        ) : (
          <div className="empty-box">No cast information available</div>
        )}
      </div>

      {guestStars && (
        <div>
          <Badge className="mb-4" variant="outline">
            Guest Stars
          </Badge>

          {guestStars.length > 0 ? (
            <div className="grid-list">
              {guestStars.map((cast) => (
                <MediaCastCard key={cast.credit_id} {...(cast as Cast)} />
              ))}
            </div>
          ) : (
            guestStars && (
              <div className="empty-box">No guest stars available</div>
            )
          )}
        </div>
      )}

      <div>
        <Badge className="mb-4" variant="outline">
          Crew
        </Badge>

        {crew.length > 0 ? (
          <div className="grid-list">
            {crew.map((crew) => (
              <MediaCrewCard key={crew.credit_id} {...crew} />
            ))}
          </div>
        ) : (
          <div className="empty-box">No crew information available</div>
        )}
      </div>
    </section>
  )
}
