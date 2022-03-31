// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type NotificationData = {
  sender: string
  time: number
  type?: string
  title: string
  body: string
}

type Data = {
  code: number
  status: string
  data: NotificationData[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const page = req.query.page
  if (page === "1") {
    setTimeout(() => {
      res.status(200).json({
        code: 200,
        status: "OK",
        data: [
          {
            sender: "Tim ERIC UGM",
            time: 1647410400000,
            type: "PROJECT_CONTINUED",
            title: "Anda dan mitra sepakat untuk melanjutkan proyek",
            body: "Account Officer kami mengonfirmasi bahwa Anda dan mitra sepakat untuk melanjutkan kolaborasi. Anda sudah bisa melihat detail proyek kemitraan bersama Microsoft Indonesia di halaman “Kolaborasi Saya”."
          },
          {
            sender: "Tim ERIC UGM",
            time: 1647324000000,
            type: "MITRA_FOUND",
            title: "Selamat! Kami berhasil menemukan mitra untukmu",
            body: "Mitra Anda adalah Microsoft Indonesia. Silakan bergabung ke dalam group chat WhatsApp berikut ini untuk berdiskusi dengan Microsoft Indonesia: wa.me/bambang_microsoft. Account Officer kami akan membantu mencatat dan menunjang proses diskusi Anda bersama mitra."
          },
          {
            sender: "Tim ERIC UGM",
            time: 1647324000000,
            type: "MITRA_FOUND",
            title: "Selamat! Kami berhasil menemukan mitra untukmu",
            body: "Mitra Anda adalah Microsoft Indonesia. Silakan bergabung ke dalam group chat WhatsApp berikut ini untuk berdiskusi dengan Microsoft Indonesia: wa.me/bambang_microsoft. Account Officer kami akan membantu mencatat dan menunjang proses diskusi Anda bersama mitra."
          }
        ]
      })
    }, 2000)
  } else if (page === "2") {
    setTimeout(() => {
      res.status(200).json({
        code: 200,
        status: "OK",
        data: [
          {
            sender: "Tim ERIC UGM",
            time: 1647410400000,
            type: "PROJECT_CONTINUED",
            title: "Anda dan mitra sepakat untuk melanjutkan proyek",
            body: "Account Officer kami mengonfirmasi bahwa Anda dan mitra sepakat untuk melanjutkan kolaborasi. Anda sudah bisa melihat detail proyek kemitraan bersama Microsoft Indonesia di halaman “Kolaborasi Saya”."
          },
          {
            sender: "Tim ERIC UGM",
            time: 1647324000000,
            type: "MITRA_FOUND",
            title: "Selamat! Kami berhasil menemukan mitra untukmu",
            body: "Mitra Anda adalah Microsoft Indonesia. Silakan bergabung ke dalam group chat WhatsApp berikut ini untuk berdiskusi dengan Microsoft Indonesia: wa.me/bambang_microsoft. Account Officer kami akan membantu mencatat dan menunjang proses diskusi Anda bersama mitra."
          },
          {
            sender: "Tim ERIC UGM",
            time: 1647324000000,
            type: "MITRA_FOUND",
            title: "Selamat! Kami berhasil menemukan mitra untukmu",
            body: "Mitra Anda adalah Microsoft Indonesia. Silakan bergabung ke dalam group chat WhatsApp berikut ini untuk berdiskusi dengan Microsoft Indonesia: wa.me/bambang_microsoft. Account Officer kami akan membantu mencatat dan menunjang proses diskusi Anda bersama mitra."
          }
        ]
      })
    }, 2000)
  } else {
    setTimeout(() => {
      res.status(200).json({
        code: 200,
        status: "OK",
        data: []
      })
    }, 2000)
  }
}
