import { GetMitraProfileResponse, GetMitraProfileResponseData } from "@/types/api-response/get-mitra-profile"
import {
  GetPenelitiProfileApiResponse,
  GetPenelitiProfileResponseData
} from "@/types/api-response/get-peneliti-profile"
import { ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image, Link } from "@react-pdf/renderer"
import { useEffect, useState } from "react"
import { axiosInstance } from "src/service/axios"

type PDFViewType = {
  proyekData: ProyekDetailApiResponseData
}

const PDFView = ({ proyekData: { pemohon, overviewProyek, kebutuhanProyek } }: PDFViewType) => {
  const [mitra, setMitra] = useState<GetMitraProfileResponseData>()
  const [peneliti, setPeneliti] = useState<GetPenelitiProfileResponseData>()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if (pemohon === "MITRA") {
      const mitraId = overviewProyek.partisipan.mitra[0].id
      axiosInstance.get<GetMitraProfileResponse>(`/backend/user/mitra/${mitraId}`).then((response) => {
        setMitra(response.data.data)
        setLoading(false)
      })
    } else {
      const penelitiId = overviewProyek.partisipan.peneliti[0].id
      axiosInstance.get<GetPenelitiProfileApiResponse>(`/backend/user/peneliti/${penelitiId}`).then((response) => {
        setPeneliti(response.data.data)
        setLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const _pemohon = pemohon.charAt(0) + pemohon.slice(1).toLowerCase()

  const getLink = (link: string) => {
    if (link.includes("https")) return link
    return `https://${link}`
  }

  return (
    <PDFViewer showToolbar width="100%" height="100%">
      <Document>
        <Page size="A4" style={styles.body}>
          <Text style={styles.header}>DETAIL PROYEK {pemohon}</Text>
          <View style={styles.tableWrapper}>
            <Text style={styles.tableHeader}>Profil {_pemohon}</Text>
            {peneliti && (
              <View style={styles.sectionWrapper}>
                <View style={{ width: "80%" }}>
                  <View style={sectionStyles.columnWrapper}>
                    <Text style={sectionStyles.tableHeader}>Nama</Text>
                    <Text style={sectionStyles.tableData}>{peneliti.nama}</Text>
                  </View>
                  <View style={sectionStyles.columnWrapper}>
                    <Text style={sectionStyles.tableHeader}>Universitas</Text>
                    <Text style={sectionStyles.tableData}>{peneliti.universitas}</Text>
                  </View>
                  <View style={sectionStyles.columnWrapper}>
                    <Text style={sectionStyles.tableHeader}>Jurusan</Text>
                    <Text style={sectionStyles.tableData}>{peneliti.programStudi}</Text>
                  </View>
                  <View style={sectionStyles.columnWrapper}>
                    <Text style={sectionStyles.tableHeader}>Email</Text>
                    <Text style={sectionStyles.tableData}>{peneliti.email}</Text>
                  </View>
                  <View style={sectionStyles.columnWrapper}>
                    <Text style={sectionStyles.tableHeader}>Profil lengkap</Text>
                    <Text style={sectionStyles.tableData}>
                      <Link src={peneliti.profileUrl}>{peneliti.profileUrl}</Link>
                    </Text>
                  </View>
                </View>
                <View style={styles.imageWrapper}>
                  <Image style={styles.image} src={peneliti.fotoProfil}></Image>
                </View>
              </View>
            )}
            {mitra && (
              <View style={styles.sectionWrapper}>
                <View style={{ width: "80%" }}>
                  <View style={sectionStyles.columnWrapper}>
                    <View style={sectionStyles.tableHeader}>
                      <Text>Nama</Text>
                      <Text>perusahaan</Text>
                    </View>
                    <Text style={sectionStyles.tableData}>{mitra.namaPerusahaan}</Text>
                  </View>
                  <View style={sectionStyles.columnWrapper}>
                    <View style={sectionStyles.tableHeader}>
                      <Text>Bidang</Text>
                      <Text>perusahaan</Text>
                    </View>
                    <Text style={sectionStyles.tableData}>{mitra.bidangPerusahaan.join(", ")}</Text>
                  </View>
                  <View style={sectionStyles.columnWrapper}>
                    <Text style={sectionStyles.tableHeader}>Alamat</Text>
                    <Text style={sectionStyles.tableData}>{mitra.alamat}</Text>
                  </View>
                  <View style={sectionStyles.columnWrapper}>
                    <Text style={sectionStyles.tableHeader}>Email</Text>
                    <Text style={sectionStyles.tableData}>{mitra.email}</Text>
                  </View>
                  <View style={sectionStyles.columnWrapper}>
                    <Text style={sectionStyles.tableHeader}>Website</Text>
                    <Text style={sectionStyles.tableData}>
                      <Link src={`https://${mitra.website}`}>{mitra.website}</Link>
                    </Text>
                  </View>
                </View>
                <View style={styles.imageWrapper}>
                  <Image src={mitra.fotoProfil}></Image>
                </View>
              </View>
            )}
          </View>
          <Text style={styles.tableHeader}>Deskripsi Karya atau Proyek</Text>
          <View>
            <View style={sectionStyles.columnWrapper}>
              <Text style={sectionStyles.tableHeader}>Judul proyek</Text>
              <Text style={sectionStyles.tableData}>{overviewProyek.judul}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <View style={sectionStyles.tableHeader}>
                <Text>Perkiraan</Text>
                <Text>periode proyek</Text>
              </View>
              <Text style={sectionStyles.tableData}>{overviewProyek.periode}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <Text style={sectionStyles.tableHeader}>Bidang proyek</Text>
              <Text style={sectionStyles.tableData}>{overviewProyek.bidang}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <Text style={sectionStyles.tableHeader}>Latar belakang</Text>
              <Text style={sectionStyles.tableData}>{overviewProyek.latarBelakang}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <View style={sectionStyles.tableHeader}>
                <Text>Tujuan</Text>
                <Text>penelitian</Text>
              </View>
              <Text style={sectionStyles.tableData}>{overviewProyek.tujuan}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <View style={sectionStyles.tableHeader}>
                <Text>Sasaran</Text>
                <Text>penelitian</Text>
              </View>
              <Text style={sectionStyles.tableData}>{overviewProyek.sasaran}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <Text style={sectionStyles.tableHeader}>Output</Text>
              <Text style={sectionStyles.tableData}>{overviewProyek.output}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <View style={sectionStyles.tableHeader}>
                <Text>Kebermanfaatan</Text>
                <Text>proyek</Text>
              </View>
              <Text style={sectionStyles.tableData}>{overviewProyek.kebermanfaatanProduk}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <View style={sectionStyles.tableHeader}>
                <Text>Indikator</Text>
                <Text>kesuksesan</Text>
              </View>
              <Text style={sectionStyles.tableData}>{overviewProyek.indikatorKesuksesan}</Text>
            </View>
            <View style={sectionStyles.columnWrapper}>
              <Text style={sectionStyles.tableHeader}>Tingkat kesiapan</Text>
              <Text style={sectionStyles.tableData}>{overviewProyek.tingkatKesiapan}</Text>
            </View>
            {overviewProyek.linkPendukung && (
              <View style={sectionStyles.columnWrapper}>
                <View style={sectionStyles.tableHeader}>
                  <Text>Dokumen</Text>
                  <Text>pendukung</Text>
                  <Text>(link)</Text>
                </View>
                <View style={sectionStyles.tableData}>
                  {overviewProyek.linkPendukung.map((item, index) => (
                    <View key={item.value} style={{ display: "flex", flexDirection: "row", marginTop: 2 }}>
                      <Text style={{ marginRight: 4 }}>•</Text>
                      <Text>
                        Link {index + 1}: <Link src={getLink(item.value)}>{item.value}</Link>
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {overviewProyek.dokumenPendukung && (
              <View style={sectionStyles.columnWrapper}>
                <View style={sectionStyles.tableHeader}>
                  <Text>Dokumen</Text>
                  <Text>pendukung</Text>
                  <Text>(file)</Text>
                </View>
                <View style={sectionStyles.tableData}>
                  {overviewProyek.dokumenPendukung.map((item, index) => (
                    <View key={item.value} style={{ display: "flex", flexDirection: "row", marginTop: 2 }}>
                      <Text style={{ marginRight: 4 }}>•</Text>
                      <Text>
                        File {index + 1}: <Link src={getLink(item.value)}>{item.value}</Link>
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {kebutuhanProyek.map((kebutuhan, index) => (
              <View key={`kebutuhan-${index + 1}`}>
                <Text style={styles.tableHeader}>Kebutuhan Proyek {index + 1}</Text>
                <View style={sectionStyles.columnWrapper}>
                  <View style={sectionStyles.tableHeader}>
                    <Text>Kebutuhan-</Text>
                    <Text>kebutuhan</Text>
                    <Text>proyek</Text>
                  </View>
                  <Text style={sectionStyles.tableData}>{kebutuhan.kebutuhanProyek}</Text>
                </View>
                <View style={sectionStyles.columnWrapper}>
                  <View style={sectionStyles.tableHeader}>
                    <Text>Bentuk</Text>
                    <Text>kolaborasi yang</Text>
                    <Text>diharapkan</Text>
                  </View>
                  <Text style={sectionStyles.tableData}>{kebutuhan.bentukKolaborasi}</Text>
                </View>
                <View style={sectionStyles.columnWrapper}>
                  <View style={sectionStyles.tableHeader}>
                    <Text>Penjelasan</Text>
                    <Text>tambahan</Text>
                  </View>
                  <Text style={sectionStyles.tableData}>{kebutuhan.penjelasanTambahan}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default PDFView

Font.register({
  family: "Playfair Display",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/playfairdisplay/v29/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf"
    },
    {
      src: "http://fonts.gstatic.com/s/playfairdisplay/v29/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQZNLo_U2r.ttf",
      fontWeight: "bold"
    }
  ]
})

const styles = StyleSheet.create({
  body: {
    width: "100%",
    padding: "40 20",
    fontFamily: "Playfair Display",
    fontSize: 12
  },
  header: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold"
  },
  tableWrapper: {
    marginTop: 10
  },
  tableHeader: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    border: "0.5px solid black",
    padding: "10",
    textAlign: "center",
    fontWeight: "bold"
  },
  sectionWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tableData: {
    padding: 7,
    border: "0.5px solid black"
  },
  imageWrapper: {
    maxWidth: "30%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    border: "0.5px solid black"
  },
  image: {
    maxHeight: "130",
    objectFit: "cover"
  }
})

const sectionStyles = StyleSheet.create({
  columnWrapper: {
    display: "flex",
    flexDirection: "row"
  },
  tableHeader: {
    ...styles.tableData,
    width: "110"
  },
  tableData: {
    ...styles.tableData,
    flex: 1
  }
})
