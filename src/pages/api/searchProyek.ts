import BaseResponse from "@lib/service/baseResponse"
import { NextApiRequest, NextApiResponse } from "next"

interface ProyekData {
  id: string
  nama: string
  fotoProfil: string
  judulProyek: string
  bidang: string
}

interface ApiResponse extends BaseResponse {
  data: ProyekData[]
  pagination: {
    totalPage: number
    currentPage: number
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const searchQuery = req.query.searchQuery
  const type = req.query.type
  const page = req.query.page ?? 1

  if (type === "peneliti") {
    if (searchQuery === "ok") {
      if (page === "1") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "123",
                nama: "Peneliti Fajar Ryan Akhra",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "124",
                nama: "Peneliti2",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "125",
                nama: "Peneliti3",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "126",
                nama: "Peneliti4",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "127",
                nama: "Peneliti5",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 1
            }
          })
        }, 1000)
      } else if (page === "2") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "223",
                nama: "Peneliti21",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "224",
                nama: "Peneliti22",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "225",
                nama: "Peneliti23",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "226",
                nama: "Peneliti24",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "227",
                nama: "Peneliti25",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 2
            }
          })
        }, 1000)
      } else if (page === "3") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "323",
                nama: "Peneliti31",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "324",
                nama: "Peneliti32",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "325",
                nama: "Peneliti33",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "326",
                nama: "Peneliti34",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "327",
                nama: "Peneliti35",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 3
            }
          })
        }, 1000)
      } else {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [],
            pagination: {
              totalPage: 3,
              currentPage: 4
            }
          })
        }, 1000)
      }
    } else {
      if (page === "1") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "123",
                nama: "Peneliti1",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "124",
                nama: "Peneliti2",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "125",
                nama: "Peneliti3",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "126",
                nama: "Peneliti4",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "127",
                nama: "Peneliti5",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 1
            }
          })
        }, 1000)
      } else if (page === "2") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "223",
                nama: "Peneliti21",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "224",
                nama: "Peneliti22",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "225",
                nama: "Peneliti23",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "226",
                nama: "Peneliti24",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "227",
                nama: "Peneliti25",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 2
            }
          })
        }, 1000)
      } else if (page === "3") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "323",
                nama: "Peneliti31",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "324",
                nama: "Peneliti32",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "325",
                nama: "Peneliti33",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "326",
                nama: "Peneliti34",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "327",
                nama: "Peneliti35",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 3
            }
          })
        }, 1000)
      } else {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [],
            pagination: {
              totalPage: 3,
              currentPage: 4
            }
          })
        }, 1000)
      }
    }
  } else {
    if (searchQuery === "") {
      if (page === "1") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "613",
                nama: "Mitra1",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "614",
                nama: "Mitra2",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "615",
                nama: "Mitra3",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "616",
                nama: "Mitra4",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "617",
                nama: "Mitra5",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 1
            }
          })
        }, 1000)
      } else if (page === "2") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "623",
                nama: "Mitra21",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "624",
                nama: "Mitra22",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "625",
                nama: "Mitra23",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "626",
                nama: "Mitra24",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "627",
                nama: "Mitra25",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 2
            }
          })
        }, 1000)
      } else if (page === "3") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "633",
                nama: "Mitra31",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "634",
                nama: "Mitra32",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "635",
                nama: "Mitra33",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "636",
                nama: "Mitra34",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "637",
                nama: "Mitra35",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 3
            }
          })
        }, 1000)
      } else {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [],
            pagination: {
              totalPage: 3,
              currentPage: 4
            }
          })
        }, 1000)
      }
    } else {
      if (page === "1") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "613",
                nama: "Mitra1",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "614",
                nama: "Mitra2",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "615",
                nama: "Mitra3",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "616",
                nama: "Mitra4",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "617",
                nama: "Mitra5",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 1
            }
          })
        }, 1000)
      } else if (page === "2") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "623",
                nama: "Mitra21",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "624",
                nama: "Mitra22",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "625",
                nama: "Mitra23",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "626",
                nama: "Mitra24",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "627",
                nama: "Mitra25",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 2
            }
          })
        }, 1000)
      } else if (page === "3") {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [
              {
                id: "633",
                nama: "Mitra31",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "634",
                nama: "Mitra32",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "635",
                nama: "Mitra33",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "636",
                nama: "Mitra34",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              },
              {
                id: "637",
                nama: "Mitra35",
                fotoProfil: "https://ui-avatars.com/api/?name=P",
                judulProyek: "Judul 1",
                bidang: "Bidang 1, Bidang 2"
              }
            ],
            pagination: {
              totalPage: 3,
              currentPage: 3
            }
          })
        }, 1000)
      } else {
        setTimeout(() => {
          res.status(200).json({
            code: 200,
            status: "OK",
            data: [],
            pagination: {
              totalPage: 3,
              currentPage: 4
            }
          })
        }, 1000)
      }
    }
  }
}
