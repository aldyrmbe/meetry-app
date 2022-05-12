import { ProyekDetailApiResponse, ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { authenticate } from "src/service/auth"
import { axiosInstance } from "src/service/axios"
const PDFView = dynamic(() => import("@components/PDF-Viewer/PDFView"), { ssr: false })

export const getServerSideProps: GetServerSideProps = authenticate("eric")

const MyDocument = () => {
  const router = useRouter()
  const proyekId = router.query.proyekId

  const [proyekData, setProyekData] = useState<ProyekDetailApiResponseData>()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    axiosInstance.get<ProyekDetailApiResponse>(`/backend/proyek/${proyekId}`).then((response) => {
      const data = response.data.data
      setProyekData(data)
      setLoading(false)
    })
    setLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading ? (
        <Flex w="100vw" h="100vh" justify="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <Box w="100vw" h="100vh">
          {proyekData && <PDFView proyekData={proyekData} />}
        </Box>
      )}
    </>
  )
}

export default MyDocument
