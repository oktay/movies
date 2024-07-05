import { DetailedCollection } from "@/tmdb/models"

import { api } from "../api"
import { CollectionRequestParams } from "./types"

const details = ({ id }: CollectionRequestParams) =>
  api.fetcher<DetailedCollection>({
    endpoint: `collection/${id}`,
  })

export const collection = {
  details,
}
