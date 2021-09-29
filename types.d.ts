
export type SortMode = "asc" | "desc"

export interface IArticle {
  title: string,
  link: string,
  published: string,
  description: string,
  id:string
  imageUrl?: string
}

export interface IActionCreator {
  type:string,
  payload: any
}
