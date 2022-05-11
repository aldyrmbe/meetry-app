export type ApiResponse = {
  code: 200 | 401 | 500
  status: "OK" | "BAD_REQUEST" | "INTERNAL_SERVER_ERROR"
}

export type PaginationData = {
  currentPage: number
  totalPage: number
}

export type BaseResponse = ApiResponse & {
  message: string
}
