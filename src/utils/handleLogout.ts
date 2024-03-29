import { axiosInstance } from "src/service/axios"
import { showToast } from "src/service/toast"
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
