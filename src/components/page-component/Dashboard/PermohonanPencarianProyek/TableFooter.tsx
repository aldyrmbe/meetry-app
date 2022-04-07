import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Flex, IconButton, Skeleton, Text } from "@chakra-ui/react"

interface TableFooterProps {
  data: any
  setPage: (value: number | ((prevVar: number) => number)) => void
  isLoading: boolean
}

const TableFooter = ({ data, setPage, isLoading }: TableFooterProps) => {
  return (
    <Flex justify="space-between" align="center" p="12px 24px">
      {isLoading ? (
        <Skeleton height="30px" w="130px"></Skeleton>
      ) : (
        <Text>
          Halaman {data?.pagination.currentPage} dari {data?.pagination.totalPage}
        </Text>
      )}
      <Flex gap="8px">
        <IconButton
          isDisabled={data?.pagination?.currentPage === 1}
          icon={<ChevronLeftIcon w="16px" h="16px" />}
          onClick={() => setPage((prevState) => prevState - 1)}
          aria-label="previous"
          variant="outline"
        ></IconButton>
        <IconButton
          isDisabled={data?.pagination?.totalPage === data?.pagination?.currentPage}
          icon={<ChevronRightIcon w="16px" h="16px" />}
          aria-label="next"
          onClick={() => setPage((prevState) => prevState + 1)}
          variant="outline"
        ></IconButton>
      </Flex>
    </Flex>
  )
}

export default TableFooter
