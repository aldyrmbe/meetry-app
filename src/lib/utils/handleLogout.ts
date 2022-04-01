import { axiosInstance } from "@lib/service/axios"
import { showToast } from "@lib/toast/toast"
import { NextRouter } from "next/router"

const handleLogout = (router: NextRouter, toast: any) => {
  axiosInstance.post("/backend/user/logout").then((res) => {
    router.replace("/")
    showToast(toast, {
      title: "Logout berhasil",
      status: "success"
    })
  })
}

export default handleLogout
