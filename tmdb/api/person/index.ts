import { ListResponse } from "@/tmdb/api/types"
import { CombinedCreditsResponse, Person, PersonDetails } from "@/tmdb/models"

import { api } from "../api"
import { PersonDetailsRequestParams, PersonListRequestParams } from "./types"

/**
 * Fetches a list of movies based on the specified criteria.
 *
 * @param {PersonListRequestParams} params - The parameters for the movie list request, including list type, page, and region.
 * @returns {Promise<ListResponse<Person>>} A promise that resolves to the list of movies.
 * @see https://developer.themoviedb.org/reference/person-popular-list
 */
const list = async ({ list, page }: PersonListRequestParams) =>
  api.fetcher<ListResponse<Person>>({
    endpoint: `person/${list}`,
    params: {
      page,
    },
  })

/**
 * Fetches details for a person by ID.
 * @param id - Person ID.
 * @param append - Additional information to append to the response.
 * @returns A promise resolving to the person details.
 * @see https://developers.themoviedb.org/3/reference/person-details
 */
const detail = async <T>({ id, append }: PersonDetailsRequestParams) =>
  api.fetcher<PersonDetails & T>({
    endpoint: `person/${id}`,
    params: {
      append_to_response: append,
    },
  })

/**
 * Fetches combined credits for a person by ID.
 * @param id - Person ID.
 * @returns A promise resolving to the combined credits for the person.
 * @see https://developers.themoviedb.org/3/reference/person-combined-credits
 */
const combinedCredits = async ({ id }: PersonDetailsRequestParams) =>
  api.fetcher<CombinedCreditsResponse>({
    endpoint: `person/${id}/combined_credits`,
  })

export const person = {
  detail,
  list,
  combinedCredits,
}
