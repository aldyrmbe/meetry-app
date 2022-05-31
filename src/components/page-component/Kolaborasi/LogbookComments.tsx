/* eslint-disable react/no-children-prop */
import { Comment, GetLogbookCommentsResponse } from "@/types/api-response/get-logbook-comments"
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from "@chakra-ui/icons"
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
  Button,
  IconButton,
  InputRightAddon,
  VStack
} from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import { getCommentDisplayTime } from "@utils/date"
import { useContext, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"
import { BaseResponse } from "@/types/base"
import { StatusType } from "@/types/api-response/get-proyek-list"
import { useFieldArray, useForm } from "react-hook-form"
import AttachmentIcon from "@components/icon/AttachmentIcon"
import { requiredValidation } from "@utils/input-validation/validation"
import FileIcon from "@components/icon/FileIcon"

type LogbookCommentsType = {
  logbookId: string
  status: StatusType
}

type LogbookCommentFormData = {
  content: string
  files: any[]
}

const LogbookComments = ({ logbookId, status }: LogbookCommentsType) => {
  const { proyekId, subFolderId } = useContext(KolaborasiPageContext)
  const { isOpen, onToggle } = useDisclosure()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [isSending, setSending] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    control,
    resetField
  } = useForm<LogbookCommentFormData>({
    mode: "onChange"
  })

  const { fields, append, remove } = useFieldArray({ control, name: "files" })

  const getComments = () => {
    axiosInstance
      .get<GetLogbookCommentsResponse>(`/backend/logbook/${proyekId}/${subFolderId}/${logbookId}/comment`)
      .then((response) => {
        setComments(response.data.data)
        setLoading(false)
        resetField("content")
        resetField("files")
      })
  }

  const onButtonClick = () => {
    if (!isOpen) getComments()
    onToggle()
  }

  const isCommentAvailable = status === "DALAM_DISKUSI" || status === "AKTIF"

  const onSubmit = handleSubmit(({ content, files }) => {
    console.log({ content, files })
    const formData = new FormData()
    formData.append("content", content)
    if (files) {
      if (files.filter((e) => e.value == null).length !== 1) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i].value[0])
        }
      }
    }
    console.log(formData.get("files"))
    setSending(true)
    axiosInstance
      .post<BaseResponse>(`/backend/logbook/${proyekId}/${subFolderId}/${logbookId}/comment`, formData)
      .then((response) => {
        getComments()
        setSending(false)
      })
  })

  return (
    <Box>
      <Flex gap="8px" align="center" onClick={onButtonClick} cursor="pointer">
        {isOpen ? (
          <Text fontSize="md" color="gray.500">
            Komentar
          </Text>
        ) : (
          <Text fontSize="md" color="gray.500">
            Lihat komentar
          </Text>
        )}
        {isOpen ? <ChevronUpIcon color="gray.500" /> : <ChevronDownIcon color="gray.500" />}
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
                    <VStack mt="16px" spacing="16px" ml="40px" align="start">
                      {comment.files &&
                        comment.files.map((file) => (
                          <Flex
                            key={file.fileUrl}
                            gap="12px"
                            borderRadius="6px"
                            borderWidth="1px"
                            borderColor="gray.200"
                            boxShadow="md"
                            align="center"
                            justify="center"
                            p="12px 8px"
                          >
                            <FileIcon fileName={file.fileName} />
                            <Text>{file.fileName}</Text>
                          </Flex>
                        ))}
                    </VStack>
                  </Box>
                ))}
              </Flex>
            )}
            {isCommentAvailable && (
              <form onSubmit={onSubmit}>
                <Flex width="95%" mt="24px" gap="12px">
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Masukkan komentar Anda di sini"
                      {...register("content", requiredValidation)}
                    />
                  </InputGroup>
                  <IconButton
                    aria-label="Add attachment"
                    children={<AttachmentIcon />}
                    onClick={() => append({ value: null })}
                    variant="outline"
                  />
                  <PrimaryButton type="submit" isDisabled={!isValid} isLoading={isSending}>
                    Kirim
                  </PrimaryButton>
                </Flex>
                {fields.map((field, index) => {
                  const watchFiles = watch(`files.${index}.value`)
                  const file = watchFiles?.[0]
                  return (
                    <InputGroup
                      mt="20px"
                      key={field.id}
                      id={`files.${index}.value`}
                      backgroundColor="white"
                      pos="relative"
                    >
                      <Flex h="48px" whiteSpace="nowrap" align="center" borderWidth={1} borderRadius="6px">
                        {!file && (
                          <Flex pos="relative" gap="12px" px="8px" borderRadius="6px" align="center" justify="center">
                            <Box pos="relative">
                              <Text fontSize="lg">Pilih file</Text>
                              <Input
                                type="file"
                                opacity="0"
                                pos="absolute"
                                inset="0"
                                {...register(`files.${index}.value`)}
                              />
                            </Box>
                            <CloseIcon cursor="pointer" w="12px" h="12px" onClick={() => remove(index)} />
                          </Flex>
                        )}
                        {file && (
                          <Flex gap="12px" px="8px" align="center" justify="center">
                            <FileIcon fileName={file.name} />
                            <Box pos="relative">
                              <Text fontSize="lg">{file.name}</Text>
                              <Input
                                type="file"
                                opacity="0"
                                pos="absolute"
                                inset="0"
                                {...register(`files.${index}.value`)}
                              />
                            </Box>
                            <CloseIcon cursor="pointer" w="12px" h="12px" onClick={() => remove(index)} />
                          </Flex>
                        )}
                      </Flex>
                    </InputGroup>
                  )
                })}
              </form>
            )}
          </>
        )}
      </Collapse>
    </Box>
  )
}

export default LogbookComments
