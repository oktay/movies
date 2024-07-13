export type PersonListType = "popular"

export type PersonDetailsRequestParams = {
  id: string | number
  append?: string
}

export type PersonListRequestParams = {
  list: PersonListType
  page?: string
}
