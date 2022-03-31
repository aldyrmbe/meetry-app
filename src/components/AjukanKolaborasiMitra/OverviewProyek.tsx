import { Flex, Text } from "@chakra-ui/react"
import PrimaryButton from "@components/Button/PrimaryButton"
import DocumentIcon from "@components/Icon/DocumentIcon"
import {
  DateInput,
  SelectInput,
  TextArea,
  TextIconInput,
  TextInput
} from "@components/Input/MeetryInput"
import { requiredValidation } from "@lib/utils/input-validation/validation"
import React, { useEffect, useRef } from "react"

interface OverviewProyekProps {
  register: any
  errors: any
  nextStep: () => void
  connectorRef: React.RefObject<HTMLDivElement>
}

const OverviewProyek = ({ register, errors, nextStep, connectorRef }: OverviewProyekProps) => {
  useEffect(() => {
    const node = connectorRef.current
    window.scrollTo({
      behavior: "smooth",
      top: node?.offsetTop! - 10
    })
  }, [])

  return (
    <>
      <Text fontWeight="bold" fontSize="lg">
        Deskripsi karya atau proyek
      </Text>
      <TextInput
        fieldName="judul"
        register={register}
        label="Judul karya atau proyek"
        placeholder="Judul karya atau proyek yang sedang Anda kerjakan"
        validation={requiredValidation}
        errors={errors}
      ></TextInput>
      <Flex align="center" mt="32px">
        <Text w="20%" whiteSpace="nowrap" fontSize="md" fontWeight="medium" color="blackAlpha.600">
          Periode Mulai
        </Text>
        <DateInput
          mt="0"
          fieldName="periodeMulai"
          register={register}
          validation={requiredValidation}
          errors={errors}
        ></DateInput>
      </Flex>
      <Flex align="center" mt="32px">
        <Text w="20%" whiteSpace="nowrap" fontSize="md" fontWeight="medium" color="blackAlpha.600">
          Periode Selesai
        </Text>
        <DateInput
          mt="0"
          fieldName="periodeSelesai"
          register={register}
          validation={requiredValidation}
          errors={errors}
        ></DateInput>
      </Flex>
      <SelectInput
        options={[
          { value: "Bidang 1", text: "Bidang 1" },
          { value: "Bidang 2", text: "Bidang 2" }
        ]}
        fieldName="bidang"
        register={register}
        label="Bidang karya atau proyek"
        placeholder="Pilih bidang karya atau proyek"
        validation={requiredValidation}
        errors={errors}
      ></SelectInput>
      <TextArea
        fieldName="latarBelakang"
        register={register}
        label="Latar belakang"
        placeholder="Apa latar belakang karya atau proyek Anda?"
        validation={requiredValidation}
        errors={errors}
      ></TextArea>
      <TextArea
        fieldName="tujuan"
        register={register}
        label="Tujuan"
        placeholder="Apa tujuannya?"
        validation={requiredValidation}
        errors={errors}
      ></TextArea>
      <TextArea
        fieldName="sasaranPengguna"
        register={register}
        label="Sasaran"
        placeholder="Siapakah sasaran atau pengguna utamanya?"
        validation={requiredValidation}
        errors={errors}
      ></TextArea>
      <TextInput
        fieldName="output"
        register={register}
        label="Output"
        placeholder="Apa outputnya?"
        validation={requiredValidation}
        errors={errors}
      ></TextInput>
      <TextArea
        fieldName="ketepatanSolusi"
        register={register}
        label="Ketepatan solusi"
        placeholder="Bagaimana karya atau proyek ini dapat menjadi solusi yang tepat sasaran?"
        validation={requiredValidation}
        errors={errors}
      ></TextArea>
      <TextArea
        fieldName="tolakUkurKesuksesan"
        register={register}
        label="Tolak ukur kesuksesan"
        placeholder="Jelaskan tolak ukur kesuksesannya"
        validation={requiredValidation}
        errors={errors}
      ></TextArea>
      <SelectInput
        options={[
          { value: "Bidang 1", text: "Fase 1" },
          { value: "Bidang 2", text: "Fase 2" }
        ]}
        fieldName="tingkatKesiapan"
        register={register}
        label="Tingkat kesiapan"
        placeholder="Pilih tingkat kesiapan karya atau proyek Anda"
        validation={requiredValidation}
        errors={errors}
      ></SelectInput>
      <Text mt="32px" fontWeight="bold" fontSize="lg">
        Unggah dokumen pendukung
      </Text>
      <TextIconInput
        fieldName="dokumenPendukung"
        register={register}
        label="Dokumen pendukung"
        placeholder="Masukkan link dokumen disini"
        icon={<DocumentIcon />}
      ></TextIconInput>
      <Flex w="100%" justify="end" mt="64px">
        <PrimaryButton p="10px 90px" onClick={nextStep}>
          Lanjutkan
        </PrimaryButton>
      </Flex>
    </>
  )
}

export default OverviewProyek
