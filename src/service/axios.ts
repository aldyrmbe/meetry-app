import axios from "axios"

const baseURL = process.env.BASE_URL ?? "http://localhost:3000"

const axiosInstance = axios.create({
  timeout: 30000,
  withCredentials: true
})

const serverSideAxiosInstance = (cookie: string | undefined) => {
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Cookie: cookie!
    },
    timeout: 30000
  })
}

export { baseURL, axiosInstance, serverSideAxiosInstance }
