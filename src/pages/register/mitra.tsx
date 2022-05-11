import Head from "next/head"
import Navbar from "@components/layout/Navbar/Navbar"
import Container from "@components/layout/Container/Container"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, HStack, Heading, Grid, Button, useToast } from "@chakra-ui/react"
import {
  TextInput,
  EmailInput,
  PasswordInput,
  SelectInput,
  DateInput,
  TextArea,
  FileInput,
  NumberInput,
  MultiSelectInput
} from "@components/input/MeetryInput"
import { requiredValidation, emailValidation, acadstaffLinkValidation } from "@utils/input-validation/validation"
import { registerMitra, RegisterMitraFormValues } from "src/service/register"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/router"
import { getOptions } from "@utils/getOptions"

const RegisterMitra = () => {
  const [isSending, setSending] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm<RegisterMitraFormValues>({ mode: "onChange" })

  const onSubmit = handleSubmit((data: RegisterMitraFormValues) => {
    registerMitra(data, toast, router, setSending)
  })

  const jenisPerusahaanOptions = ["Perusahaan Publik", "Perusahaan Swasta", "Perusahaan Perorangan"]

  const bidangPerushaanOptions = [
    "Energi",
    "Elektronika",
    "Bioteknologi",
    "Kesehatan",
    "Pendidikan",
    "Perdagangan",
    "Peternakan",
    "Agrikultur",
    "Konstruksi",
    "Manufaktur",
    "Ekstraktif",
    "Transportasi",
    "Pangan",
    "Jasa",
    "Teknologi"
  ]

  return (
    <>
      <Head>
        <title>Daftar Sebagai Peneliti</title>
      </Head>
      <Navbar></Navbar>
      <Container justify="space-between">
        <Box w="50%">
          <HStack mb="32px" spacing="16px">
            <Box as="a" href="/register">
              <ArrowBackIcon w="23px" h="32px" />
            </Box>
            <Heading as="h2" size="lg">
              Lengkapi Data Diri
            </Heading>
          </HStack>
          <Box w="100%">
            <form onSubmit={onSubmit}>
              <TextInput
                fieldName="namaPerusahaan"
                register={register}
                label="Nama perusahaan"
                placeholder="Nama perusahaan"
                validation={requiredValidation}
                errors={errors}
              ></TextInput>
              <EmailInput
                fieldName="email"
                register={register}
                label="Email"
                placeholder="example@gmail.com"
                validation={emailValidation}
                errors={errors}
              ></EmailInput>
              <PasswordInput
                fieldName="password"
                register={register}
                label="Password baru"
                placeholder="Password baru"
                validation={requiredValidation}
                errors={errors}
              ></PasswordInput>
              <SelectInput
                control={control}
                fieldName="jenisPerusahaan"
                label="Jenis perusahaan"
                placeholder="Pilih salah satu"
                rules={requiredValidation}
                options={getOptions(jenisPerusahaanOptions)}
              ></SelectInput>
              <MultiSelectInput
                control={control}
                fieldName="bidangPerusahaan"
                label="Bidang perusahaan"
                placeholder="Pilih semua yang terkait"
                rules={requiredValidation}
                options={getOptions(bidangPerushaanOptions)}
              ></MultiSelectInput>
              <NumberInput
                fieldName="nomorTelepon"
                register={register}
                label="Nomor telepon"
                placeholder="Nomor telepon"
                validation={requiredValidation}
                errors={errors}
              ></NumberInput>
              <TextArea
                fieldName="alamat"
                register={register}
                label="Alamat"
                placeholder="Alamat lengkap"
                validation={requiredValidation}
                errors={errors}
              ></TextArea>
              <TextArea
                fieldName="profilSingkat"
                register={register}
                label="Profil singkat"
                placeholder="Profil singkat perusahaan"
                validation={requiredValidation}
                errors={errors}
              ></TextArea>
              <TextInput
                fieldName="website"
                register={register}
                label="Website"
                placeholder="Alamat website (opsional)"
                errors={errors}
              ></TextInput>
              <FileInput
                fieldName="fotoProfil"
                register={register}
                watch={watch}
                label="Foto profil (opsional)"
                placeholder="Pilih file"
                helperText="Format: jpg, jpeg, png"
              ></FileInput>
              <Button
                isDisabled={!isValid}
                isLoading={isSending}
                loadingText="Mengirim..."
                my="56px"
                colorScheme="teal"
                type="submit"
              >
                Selesai
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default RegisterMitra
