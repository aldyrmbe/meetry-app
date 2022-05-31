import { Button, Flex, Text } from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import DocumentIcon from "@components/icon/DocumentIcon"
import { DateInput, SelectInput, TextArea, TextIconInput, TextInput, FileInput } from "@components/input/MeetryInput"
import { requiredValidation } from "src/utils/input-validation/validation"
import React, { useEffect } from "react"
import { useFieldArray } from "react-hook-form"
import { AddIcon } from "@chakra-ui/icons"
import { groupedOptions } from "@constants/bidangMitraOptions"
import { getOptions } from "@utils/getOptions"

type OverviewProyekProps = {
  register: any
  errors: any
  nextStep: () => void
  connectorRef: React.RefObject<HTMLDivElement>
  control: any
  watch: any
  trigger: any
  getValues: any
}

const OverviewProyek = ({
  register,
  errors,
  nextStep,
  connectorRef,
  control,
  watch,
  trigger,
  getValues
}: OverviewProyekProps) => {
  useEffect(() => {
    const node = connectorRef.current
    window.scrollTo({
      behavior: "smooth",
      top: node?.offsetTop! - 10
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNext = async () => {
    let isValid = await trigger(
      [
        "judul",
        "periodeMulai",
        "periodeSelesai",
        "bidang",
        "latarBelakang",
        "tujuan",
        "sasaran",
        "output",
        "kebermanfaatanProduk",
        "indikatorKesuksesan",
        "tingkatKesiapan"
      ],
      { shouldFocus: true }
    )
    if (isValid) {
      nextStep()
    }
  }

  const tingkatKesiapanOptions = [
    "0 - Non Teknologi",
    "1 - Asumsi Dasar",
    "2 - Formulasi Konsep",
    "3 - Pembuktian Konsep",
    "4 - Validasi Laboratorium",
    "5 - Validasi Lingkungan",
    "6 - Purwarupa Dasar",
    "7 - Purwarupa Final",
    "8 - Sistem Lengkap",
    "9 - Sistem Teruji"
  ]

  const {
    fields: linkFields,
    append: linkAppend,
    remove: linkRemove
  } = useFieldArray({ control, name: "linkPendukung" })

  const {
    fields: dokumenFields,
    append: dokumenAppend,
    remove: dokumenRemove
  } = useFieldArray({ control, name: "dokumenPendukung" })

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
      />
      <Flex align="center" mt="32px">
        <Text w="20%" whiteSpace="nowrap" fontSize="md" fontWeight="medium" color="blackAlpha.600">
          Periode Mulai
        </Text>
        <DateInput
          mt="0"
          fieldName="periodeMulai"
          register={register}
          validation={{
            ...requiredValidation,
            validate: (value: string) => new Date(value).getTime() >= new Date().getTime() || "Periode tidak valid"
          }}
          errors={errors}
        />
      </Flex>
      <Flex align="center" mt="32px">
        <Text w="20%" whiteSpace="nowrap" fontSize="md" fontWeight="medium" color="blackAlpha.600">
          Periode Selesai
        </Text>
        <DateInput
          mt="0"
          fieldName="periodeSelesai"
          register={register}
          validation={{
            ...requiredValidation,
            validate: (value: string) =>
              new Date(value).getTime() > new Date(getValues("periodeMulai")).getTime() ||
              "Periode selesai tidak boleh sama atau mendahului periode mulai"
          }}
          errors={errors}
        />
      </Flex>
      <SelectInput
        options={groupedOptions}
        fieldName="bidang"
        control={control}
        label="Bidang karya atau proyek"
        placeholder="Pilih bidang karya atau proyek"
        rules={requiredValidation}
      />
      <TextArea
        fieldName="latarBelakang"
        register={register}
        label="Latar belakang"
        placeholder="Apa latar belakang karya atau proyek Anda?"
        validation={requiredValidation}
        errors={errors}
      />
      <TextArea
        fieldName="tujuan"
        register={register}
        label="Tujuan"
        placeholder="Apa tujuannya?"
        validation={requiredValidation}
        errors={errors}
      />
      <TextArea
        fieldName="sasaran"
        register={register}
        label="Sasaran"
        placeholder="Siapakah sasaran atau pengguna utamanya?"
        validation={requiredValidation}
        errors={errors}
      />
      <TextInput
        fieldName="output"
        register={register}
        label="Output"
        placeholder="Apa outputnya?"
        validation={requiredValidation}
        errors={errors}
      />
      <TextArea
        fieldName="kebermanfaatanProduk"
        register={register}
        label="Kebermanfaatan produk"
        placeholder="Bagaimana karya atau proyek ini dapat menjadi solusi yang tepat sasaran?"
        validation={requiredValidation}
        errors={errors}
      />
      <TextArea
        fieldName="indikatorKesuksesan"
        register={register}
        label="Indikator kesuksesan"
        placeholder="Jelaskan indikator kesuksesannya"
        validation={requiredValidation}
        errors={errors}
      />
      <SelectInput
        options={getOptions(tingkatKesiapanOptions)}
        fieldName="tingkatKesiapan"
        control={control}
        label="Tingkat kesiapan"
        placeholder="Pilih tingkat kesiapan karya atau proyek Anda"
        rules={requiredValidation}
      />
      <Text mt="32px" fontWeight="bold" fontSize="lg">
        Dokumen pendukung (link)
      </Text>
      {linkFields.map((field, index) => {
        return (
          <Flex key={field.id} w="100%" align="flex-end" gap="32px">
            <TextInput
              fieldName={`linkPendukung.${index}.value`}
              register={register}
              label={`Link ${index + 1}`}
              placeholder="Masukkan link dokumen disini"
            />
            {linkFields.length !== 1 && <PrimaryButton onClick={() => linkRemove(index)}>Hapus</PrimaryButton>}
          </Flex>
        )
      })}
      <Button
        w="100%"
        mt="32px"
        size="sm"
        leftIcon={<AddIcon w="10px" mr="8px"></AddIcon>}
        onClick={() => linkAppend({ value: "" })}
        variant="ghost"
      >
        Tambah Link Baru
      </Button>
      <Text mt="32px" fontWeight="bold" fontSize="lg">
        Dokumen pendukung (file)
      </Text>
      {dokumenFields.map((field, index) => {
        return (
          <Flex key={field.id} w="100%" align="center" gap="32px">
            <FileInput
              fieldName={`dokumenPendukung.${index}.value`}
              register={register}
              watch={watch}
              label={`Dokumen ${index + 1}`}
              placeholder="Pilih file"
              helperText="Format: jpg, jpeg, png, pdf"
            />
            {dokumenFields.length !== 1 && (
              <PrimaryButton mt="38px" onClick={() => dokumenRemove(index)}>
                Hapus
              </PrimaryButton>
            )}
          </Flex>
        )
      })}
      <Button
        w="100%"
        mt="32px"
        size="sm"
        leftIcon={<AddIcon w="10px" mr="8px"></AddIcon>}
        onClick={() => dokumenAppend({ value: null })}
        variant="ghost"
      >
        Tambah File Baru
      </Button>
      <Flex w="100%" justify="end" mt="64px">
        <PrimaryButton p="10px 90px" onClick={handleNext}>
          Lanjutkan
        </PrimaryButton>
      </Flex>
    </>
  )
}

export default OverviewProyek
