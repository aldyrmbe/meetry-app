import { useState, useEffect } from "react"
import { Message, over } from "stompjs"
import SockJS from "sockjs-client"

export const WEB_SOCKET_URL = process.env.BASE_URL ?? "http:localhost:8080/meetry-ws"

export const useRealtimeNotification = (userId: string) => {
  const [hasNewNotification, setNewNotification] = useState<any>()
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    let sockJSClient = new SockJS(WEB_SOCKET_URL)
    let stompJSClient = over(sockJSClient)

    const onMessageReceived = (message: Message) => {
      const response = JSON.parse(message.body).hasNewNotification
      setNewNotification(response)
      console.log(response)
    }

    const onConnected = () => {
      stompJSClient.subscribe(`/notification/${userId}`, onMessageReceived)
    }

    const onError = () => {
      setError(true)
    }

    stompJSClient.connect({}, onConnected, onError)

    return () => {
      stompJSClient.disconnect(() => {
        console.log("Websocket disconnected")
      })
    }
  }, [])

  return { hasNewNotification, error }
}