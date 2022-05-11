/* eslint-disable react/no-children-prop */
import { Comment, GetLogbookCommentsResponse } from "@/types/api-response/get-logbook-comments"
import { ChatIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import {
  Box,
  Image,
  Collapse,
  Flex,
  Text,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Button
} from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import { getCommentDisplayTime } from "@utils/date"
import { useContext, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"
import { BaseResponse } from "@/types/base"

type LogbookCommentsType = {
  logbookId: string
}

const LogbookComments = ({ logbookId }: LogbookCommentsType) => {
  const { proyekId, subFolderId } = useContext(KolaborasiPageContext)
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [comment, setComment] = useState<string>("")
  const [isSending, setSending] = useState<boolean>(false)

  const getComments = () => {
    axiosInstance
      .get<GetLogbookCommentsResponse>(`/backend/logbook/${proyekId}/${subFolderId}/${logbookId}/comment`)
      .then((response) => {
        setComments(response.data.data)
        setLoading(false)
      })
  }

  const onButtonClick = () => {
    if (!isOpen) getComments()
    onToggle()
  }

  const isDisabled = comment == undefined || comment == ""

  const onCommentChange = (e: any) => {
    setComment(e.target.value)
  }

  const submitComment = () => {
    setSending(true)
    const requestBody = {
      content: comment
    }
    axiosInstance
      .post<BaseResponse>(`/backend/logbook/${proyekId}/${subFolderId}/${logbookId}/comment`, requestBody)
      .then((response) => {
        getComments()
        setSending(false)
        setComment("")
      })
  }

  return (
    <Box>
      <Flex gap="8px" align="center" onClick={onButtonClick} cursor="pointer">
        <Text fontSize="md" color="gray.500">
          Lihat komentar
        </Text>
        {isOpen ? (
          <ChevronUpIcon color="gray.500"></ChevronUpIcon>
        ) : (
          <ChevronDownIcon color="gray.500"></ChevronDownIcon>
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        {isLoading ? (
          <Text mt="24px">Loading...</Text>
        ) : (
          <>
            {comments.length == 0 ? (
              <Text mt="24px">Belum ada komentar.</Text>
            ) : (
              <Flex flexDir="column" width="100%">
                {comments.map((comment, index) => (
                  <Box key={`${comment.pengirim}-${index}`} pb="16px" mt="24px">
                    <Flex gap="16px" align="center">
                      <Image h="24px" w="24px" borderRadius="full" alt="Mitra" src={comment.profilePhoto}></Image>
                      <Flex gap="10px" align="center">
                        <Text fontSize="md" fontWeight="semibold">
                          {comment.pengirim}
                        </Text>
                        <Box w="6px" h="6px" borderRadius="full" backgroundColor="gray.300"></Box>
                        <Text fontSize="md" fontWeight="semibold">
                          {getCommentDisplayTime(comment.waktu)}
                        </Text>
                      </Flex>
                    </Flex>
                    <Text ml="40px" mt="16px" fontSize="md">
                      {comment.isi}
                    </Text>
                  </Box>
                ))}
              </Flex>
            )}
            <Flex width="95%" mt="24px" gap="25px">
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<ChatIcon color="gray.300" />} />
                <Input
                  onChange={onCommentChange}
                  type="text"
                  placeholder="Masukkan komentar Anda di sini"
                  value={comment}
                />
              </InputGroup>
              <PrimaryButton
                isDisabled={isDisabled}
                isLoading={isSending}
                loadingText="Mengirim..."
                onClick={submitComment}
              >
                Kirim
              </PrimaryButton>
            </Flex>
          </>
        )}
      </Collapse>
    </Box>
  )
}

export default LogbookComments
