import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { useContext, useRef } from "react"
import { StatusType } from "@/types/api-response/get-proyek-list"
import { Box, Button, Collapse, Flex, Text, useDisclosure } from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import ActivateProyekModal from "@components/modal/ActivateProyekModal"
import { ChevronDownIcon } from "@chakra-ui/icons"
import CancelProyekDialog from "@components/alert-dialog/CancelProyekDialog"
import CloseProyekDialog from "@components/alert-dialog/CloseProyekDialog"

type ProyekOperationsType = {
  status: StatusType
}

const ProyekOperations = ({ status }: ProyekOperationsType) => {
  const { proyekId } = useContext(KolaborasiPageContext)
  const {
    isOpen: isActivateProyekModalOpen,
    onOpen: onActivateProyekModalOpen,
    onClose: onActivateProyekModalClose
  } = useDisclosure()
  const { isOpen: isCloseProyekOptionsOpen, onToggle: onCloseProyekOptionsToggle } = useDisclosure()
  const {
    isOpen: isCancelProyekDialogOpen,
    onOpen: onCancelProyekDialogOpen,
    onClose: onCancelProyekDialogClose
  } = useDisclosure()
  const {
    isOpen: isCloseProyekDialogOpen,
    onOpen: onCloseProyekDialogOpen,
    onClose: onCloseProyekDialogClose
  } = useDisclosure()

  const cancelProyekCancelRef = useRef()
  const closeProyekCancelRef = useRef()

  const isActivateProyekDisabled = status !== "DALAM_DISKUSI"
  const isCloseProyekDisabled = status == "DIBATALKAN" || status == "SELESAI" || status == "DALAM_PENGAJUAN"

  return (
    <>
      <Flex w="100%" gap="32px" mb="32px">
        <PrimaryButton w="50%" isDisabled={isActivateProyekDisabled} onClick={onActivateProyekModalOpen}>
          Aktifkan Proyek
        </PrimaryButton>
        <Box w="50%" position="relative">
          <PrimaryButton
            rightIcon={<ChevronDownIcon />}
            w="100%"
            isDisabled={isCloseProyekDisabled}
            onClick={onCloseProyekOptionsToggle}
          >
            Tutup Proyek
          </PrimaryButton>
          <Collapse in={isCloseProyekOptionsOpen} animateOpacity>
            <Flex
              mt="3px"
              flexDir="column"
              position="absolute"
              right="0"
              borderRadius="6px"
              backgroundColor="white"
              w="100%"
              boxShadow="lg"
              cursor="pointer"
              fontSize="lg"
            >
              {status == "AKTIF" && (
                <Text
                  _hover={{ backgroundColor: "gray.200" }}
                  p="10px 20px 10px 20px"
                  onClick={onCloseProyekDialogOpen}
                >
                  Selesai
                </Text>
              )}
              <Text _hover={{ backgroundColor: "gray.200" }} p="10px 20px 10px 20px" onClick={onCancelProyekDialogOpen}>
                Batalkan proyek
              </Text>
            </Flex>
          </Collapse>
        </Box>
      </Flex>
      <ActivateProyekModal
        proyekId={proyekId!}
        isOpen={isActivateProyekModalOpen}
        onClose={onActivateProyekModalClose}
      ></ActivateProyekModal>
      <CancelProyekDialog
        isOpen={isCancelProyekDialogOpen}
        onClose={onCancelProyekDialogClose}
        proyekId={proyekId!}
        cancelRef={cancelProyekCancelRef}
      ></CancelProyekDialog>
      <CloseProyekDialog
        isOpen={isCloseProyekDialogOpen}
        onClose={onCloseProyekDialogClose}
        proyekId={proyekId!}
        cancelRef={closeProyekCancelRef}
      ></CloseProyekDialog>
    </>
  )
}

export default ProyekOperations
