import BaseResponse from "src/service/baseResponse"
import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse } from "src/hooks/useDetailProyek"

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const proyekId = req.query.proyekId
  if (proyekId === "123") {
    setTimeout(() => {
      res.status(200).json({
        code: 200,
        status: "OK",
        data: [
          { label: "Peneliti", value: "Sultan" },
          {
            label: "Judul Proyek",
            value: "Proyek pembuatan aplikasi berbasis website untuk COVID-19"
          },
          { label: "Perkiraan Periode Proyek", value: "1 November 2021 - 1 Mei 2021 (6 Bulan)" },
          { label: "Bidang Proyek", value: "Teknologi" },
          {
            label: "Latar Belakang",
            value:
              "Salah satu langkah pencegahan penyebaran virus COVID-19 dapat dilakukan dengan cara melakukan karantina terhadap kelompok orang berisiko diantaranya ODP (Orang Dalam Pemantauan) selama 14 hari dan surveilans/pemantauan kondisi kesehatan ODP tersebut selama masa karantina sebagaimana panduan yang diterbitkan Kementrian Kesehatan Indonesia berupa Kartu Kewaspadaan Kesehatan Pedoman dan Pencegahan Pengendalian COVID-19. Upaya karantina/isolasi mandiri dilakukan sebagai metoda untuk membatasi seseorang atau sekelompok orang dalam suatu wilayah yang diduga terinfeksi penyakit dan/atau terkontaminasi. Namun pemantauan terhadap kepatuhan pelaksanaan isolasi mandiri sulit dilakukan karena puskesmas sebagai unit fasilitas kesehatan yang ditugaskan untuk melakukan pemantauan tidak memiliki alat pantau yang dapat menjamin kepatuhan ODP selama masa isolasi."
          },
          {
            label: "Tujuan Penelitian",
            value: "Memantau dan mendata pergerakan masyarakat saat melaksanakan isolasi mandiri."
          },
          {
            label: "Sasaran Penelitian",
            value: "Masyarakat Indonesia yang berstatus ODP (Orang Dalam Pengawasan)."
          },
          { label: "Output", value: "Aplikasi berbasis website." },
          {
            label: "Bagaimana karya atau proyek ini dapat menjadi solusi yang tepat sasaran?",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          },
          {
            label: "Tolak ukur kesuksesan proyek",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          },
          { label: "Tingkat kesiapan sudah mencapai", value: "Prototipe" },
          { label: "Dokumen pendukung", value: "drive.google.com/proyek_bambang" },
          {
            label: "Kebutuhan-kebutuhan proyek",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          },
          {
            label: "Bentuk kolaborasi yang diharapkan",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          },
          { label: "Bidang mitra yang diinginkan", value: "Komputer, Software, Jaringan" },
          { label: "Bidang Proyek", value: "Teknologi" },
          {
            label: "Penjelasan tambahan tentang mitra yang ingin dicari",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          }
        ]
      })
    }, 1000)
  } else {
    setTimeout(() => {
      res.status(200).json({
        code: 200,
        status: "OK",
        data: [
          { label: "Peneliti", value: "Sultan123" },
          {
            label: "Judul Proyek",
            value: "Proyek pembuatan aplikasi berbasis website untuk COVID-19"
          },
          { label: "Perkiraan Periode Proyek", value: "1 November 2021 - 1 Mei 2021 (6 Bulan)" },
          { label: "Bidang Proyek", value: "Teknologi" },
          {
            label: "Latar Belakang",
            value:
              "Salah satu langkah pencegahan penyebaran virus COVID-19 dapat dilakukan dengan cara melakukan karantina terhadap kelompok orang berisiko diantaranya ODP (Orang Dalam Pemantauan) selama 14 hari dan surveilans/pemantauan kondisi kesehatan ODP tersebut selama masa karantina sebagaimana panduan yang diterbitkan Kementrian Kesehatan Indonesia berupa Kartu Kewaspadaan Kesehatan Pedoman dan Pencegahan Pengendalian COVID-19. Upaya karantina/isolasi mandiri dilakukan sebagai metoda untuk membatasi seseorang atau sekelompok orang dalam suatu wilayah yang diduga terinfeksi penyakit dan/atau terkontaminasi. Namun pemantauan terhadap kepatuhan pelaksanaan isolasi mandiri sulit dilakukan karena puskesmas sebagai unit fasilitas kesehatan yang ditugaskan untuk melakukan pemantauan tidak memiliki alat pantau yang dapat menjamin kepatuhan ODP selama masa isolasi."
          },
          {
            label: "Tujuan Penelitian",
            value: "Memantau dan mendata pergerakan masyarakat saat melaksanakan isolasi mandiri."
          },
          {
            label: "Sasaran Penelitian",
            value: "Masyarakat Indonesia yang berstatus ODP (Orang Dalam Pengawasan)."
          },
          { label: "Output", value: "Aplikasi berbasis website." },
          {
            label: "Bagaimana karya atau proyek ini dapat menjadi solusi yang tepat sasaran?",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          },
          {
            label: "Tolak ukur kesuksesan proyek",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          },
          { label: "Tingkat kesiapan sudah mencapai", value: "Prototipe" },
          { label: "Dokumen pendukung", value: "drive.google.com/proyek_bambang" },
          {
            label: "Kebutuhan-kebutuhan proyek",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          },
          {
            label: "Bentuk kolaborasi yang diharapkan",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          },
          { label: "Bidang mitra yang diinginkan", value: "Komputer, Software, Jaringan" },
          { label: "Bidang Proyek", value: "Teknologi" },
          {
            label: "Penjelasan tambahan tentang mitra yang ingin dicari",
            value:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dis at non magna. Metus, sollicitudin id in adipiscing. Orci, ornare tincidunt amet blandit ipsum. Tempus, aliquet et cursus massa nam quis tortor. Morbi mauris lectus dui, quis auctor. Malesuada semper ac sodales nulla turpis tincidunt."
          }
        ]
      })
    }, 1000)
  }
}
