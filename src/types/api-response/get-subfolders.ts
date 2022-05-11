import { ApiResponse } from "../base"

export type GetSubFoldersApiResponse = ApiResponse & {
  data: GetSubFoldersDataResponse
}

export type GetSubFoldersDataResponse = {
  folderName: string
  subFolders: SubFolder[]
}

export type SubFolder = {
  id: string
  namaSubFolder: string
}
