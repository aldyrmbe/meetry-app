import { AccountOfficerDetails, GetAccountOfficerListResponse } from "@/types/api-response/get-account-officer-list"
import { AddIcon } from "@chakra-ui/icons"
import { Box, Center, Divider, Fade, Flex, Image, Spinner, Text, useDisclosure, VStack } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import AddAccountOfficerModal from "@components/modal/AddAccountOfficerModal"
import { useEffect, useState } from "react"
import { axiosInstance } from "src/service/axios"

const AccountOfficerSection = () => {
  const {
    isOpen: isAddAccountOfficerModalOpen,
    onOpen: onAddAccountOfficerModalOpen,
    onClose: onAddAccountOfficerModalClose
  } = useDisclosure()
  const [accountOfficerList, setAccountOfficerList] = useState<AccountOfficerDetails[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const fetchMoreData = () => {
    setIsFetching(true)
    axiosInstance
      .get<GetAccountOfficerListResponse>(`/backend/user/getListAccountOfficers?page=${page}`)
      .then((response) => {
        const data = response.data.data
        const { currentPage, totalPage } = data.paginationData
        setPage((prevPage) => prevPage + 1)
        setHasMore(totalPage !== 0 && currentPage !== totalPage)
        setAccountOfficerList(accountOfficerList.concat(data.accountOfficerList))
        setIsFetching(false)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchMoreData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Flex as="section" w="30%" maxH="calc(100vh - 80px - 80px)" flexDir="column" gap="20px">
        <Text fontSize="lg" fontWeight="medium">
          Account Officer
        </Text>
        <OutlinedButton
          w="100%"
          leftIcon={<AddIcon w="10px" mr="8px"></AddIcon>}
          onClick={onAddAccountOfficerModalOpen}
        >
          Tambah Account Officer
        </OutlinedButton>
        <Box flex="1" maxH="100%" overflowY="scroll">
          {isLoading ? (
            <Center h="100%">
              <Spinner color="teal.400" size="xl"></Spinner>
            </Center>
          ) : (
            <Fade in={true}>
              <VStack align="stretch" spacing="20px">
                {accountOfficerList.map((accountOfficer) => (
                  <Flex
                    key={accountOfficer.email}
                    p="20px"
                    borderRadius="6px"
                    backgroundColor="white"
                    boxShadow="base"
                    gap="20px"
                  >
                    <Image
                      alt="account officer"
                      src={accountOfficer.profilePhoto}
                      w="64px"
                      h="64px"
                      borderRadius="full"
                    ></Image>
                    <Flex justify="space-between" flexDir="column">
                      <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                        {accountOfficer.nama}
                      </Text>
                      <Text color="gray.500">{accountOfficer.email}</Text>
                    </Flex>
                  </Flex>
                ))}
              </VStack>
              {hasMore && (
                <Box h="40px" mt="20px">
                  <PrimaryButton
                    isLoading={!isLoading && isFetching}
                    loadingText="Memuat..."
                    onClick={fetchMoreData}
                    w="100%"
                  >
                    Muat lebih banyak
                  </PrimaryButton>
                </Box>
              )}
              {!isFetching && !hasMore && (
                <Flex h="40px" mt="20px" justify="center" align="center">
                  <Text align="center">Tidak ada data yang bisa ditampilkan lagi</Text>
                </Flex>
              )}
            </Fade>
          )}
        </Box>
      </Flex>
      <AddAccountOfficerModal
        isOpen={isAddAccountOfficerModalOpen}
        onClose={onAddAccountOfficerModalClose}
      ></AddAccountOfficerModal>
    </>
  )
}

export default AccountOfficerSection
