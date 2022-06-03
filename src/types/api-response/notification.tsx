import { ApiResponse, PaginationData } from "@/types/base"

export type NotificationData = {
  id: string
  createdAt: number
  title: string
  description: string
  opened: string
  redirectionUrl: string
}

export type GetNotificationResponse = ApiResponse & {
  data: {
    paginationData: PaginationData
    notifications: NotificationData[]
  }
}
