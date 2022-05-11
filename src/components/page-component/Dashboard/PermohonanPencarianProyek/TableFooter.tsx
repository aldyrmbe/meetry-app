import { PaginationData } from "@/types/base"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Flex, IconButton, Skeleton, Spinner, Text } from "@chakra-ui/react"

type TableFooterType = {
  paginationData: PaginationData | undefined
  setPage: (value: number | ((prevVar: number) => number)) => void
  isLoading: boolean
}

const TableFooter = ({ paginationData, setPage, isLoading }: TableFooterType) => {
  return (
    <>
      {isLoading ? (
        <Flex justify="space-between" align="center" p="20px 24px">
          <Spinner />
        </Flex>
      ) : paginationData?.totalPage === 0 ? (
        <Flex justify="space-between" align="center" p="20px 24px">
          Tidak ada data.
        </Flex>
      ) : (
        <Flex justify="space-between" align="center" p="12px 24px">
          <Text>
            Halaman {paginationData?.currentPage} dari {paginationData?.totalPage}
          </Text>
          <Flex gap="8px">
            <IconButton
              isDisabled={paginationData?.currentPage === 1}
              icon={<ChevronLeftIcon w="16px" h="16px" />}
              onClick={() => setPage((prevState) => prevState - 1)}
              aria-label="previous"
              variant="outline"
            ></IconButton>
            <IconButton
              isDisabled={paginationData?.totalPage === paginationData?.currentPage}
              icon={<ChevronRightIcon w="16px" h="16px" />}
              aria-label="next"
              onClick={() => setPage((prevState) => prevState + 1)}
              variant="outline"
            ></IconButton>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default TableFooter
