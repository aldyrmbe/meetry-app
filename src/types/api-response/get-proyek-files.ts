import { ApiResponse } from "../base"

export type GetProyekFilesApiResponse = ApiResponse & {
  data: FileData[]
}

export type FileData = {
  name: string
  url: string
}
