import { ApiResponse } from "@/types/base"

export type NotificationData = {
  sender: string
  time: number
  type?: string
  title: string
  body: string
}

export type GetNotificationResponse = ApiResponse & {
  data: NotificationData[]
}
