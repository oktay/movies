"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import {
  RawCombinedCredit,
  RawMovieCredit,
  RawTvShowCredit,
} from "@/tmdb/models"
import { format } from "@/tmdb/utils"
import { Clapperboard, Tv } from "lucide-react"

import { pluralize } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PersonCreditsTableProps {
  credits: RawCombinedCredit[]
  department: string
}

export const PersonCreditsTable: React.FC<PersonCreditsTableProps> = ({
  credits,
  department,
}) => {
  const [value, setValue] = React.useState<string>("all")

  const sort = (a: RawCombinedCredit, b: RawCombinedCredit) => {
    const aDate = new Date(
      a.media_type === "tv" ? a.first_air_date : a.release_date
    )
    const bDate = new Date(
      b.media_type === "tv" ? b.first_air_date : b.release_date
    )
    return bDate.getTime() - aDate.getTime()
  }

  const filter = (credit: RawCombinedCredit) => {
    return value === "all" || credit.media_type === value
  }

  const sortedList = useMemo(() => credits.sort(sort), [credits])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{department}</h2>
        <div className="flex w-64 items-center gap-2">
          <Label className="text-muted-foreground">Filter</Label>

          <Select value={value} onValueChange={setValue}>
            <SelectTrigger>
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="tv">TV Shows</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead className="w-24">Year</TableHead>
            <TableHead className="w-full">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedList
            .filter(filter)
            ?.map((credit) =>
              credit.media_type === "tv" ? (
                <CreditsTableTvItem key={credit.credit_id} {...credit} />
              ) : (
                <CreditsTableMovieItem key={credit.credit_id} {...credit} />
              )
            )}
        </TableBody>
      </Table>
    </div>
  )
}

const CreditsTableMovieItem: React.FC<RawMovieCredit> = ({
  id,
  release_date,
  title,
  character,
  job,
}) => (
  <TableRow>
    <TableCell className="text-center font-medium">
      <Clapperboard className="inline-block size-4" />
    </TableCell>
    <TableCell>{release_date ? format.year(release_date) : "-"}</TableCell>
    <TableCell>
      <Link className="font-medium" href={`/movie/${id}`}>
        {title}
      </Link>
      {(character || job) && (
        <p className="text-muted-foreground">as {character || job}</p>
      )}
    </TableCell>
  </TableRow>
)

const CreditsTableTvItem: React.FC<RawTvShowCredit> = ({
  id,
  first_air_date,
  name,
  episode_count,
  character,
  job,
}) => (
  <TableRow>
    <TableCell className="text-center font-medium">
      <Tv className="inline-block size-4" />
    </TableCell>
    <TableCell>{first_air_date ? format.year(first_air_date) : "-"}</TableCell>
    <TableCell>
      <Link className="font-medium" href={`/tv/${id}`}>
        {name}
      </Link>
      <p className="text-muted-foreground">
        {episode_count > 0 && (
          <span>
            {episode_count} {pluralize(episode_count, "episode", "episodes")}
          </span>
        )}
        {(character || job) && ` as ${character || job}`}
      </p>
    </TableCell>
  </TableRow>
)
