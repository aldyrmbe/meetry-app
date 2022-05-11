import { Box, HStack, Heading, Grid, Button, useToast, FormControl, FormLabel } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import {
  TextInput,
  EmailInput,
  PasswordInput,
  NumberInput,
  SelectInput,
  DateInput,
  TextArea,
  FileInput,
  AsyncSelectInput
} from "@components/input/MeetryInput"
import Container from "@components/layout/Container/Container"
import Navbar from "@components/layout/Navbar/Navbar"
import Head from "next/head"
import { debounce } from "lodash"
import { useForm } from "react-hook-form"
import { emailValidation, requiredValidation, acadstaffLinkValidation } from "src/utils/input-validation/validation"
import { useState } from "react"
import { RegisterPenelitiFormValues, registerPeneliti } from "src/service/register"
import { useRouter } from "next/router"
import { GetUniversitiesByNameResponse } from "@/types/api-response/get-universities-by-name"
import { axiosInstance } from "src/service/axios"

const RegisterPeneliti = () => {
  const [isSending, setSending] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm<RegisterPenelitiFormValues>({ mode: "onChange" })

  const onSubmit = handleSubmit((data: RegisterPenelitiFormValues) => {
    registerPeneliti(data, toast, router, setSending)
  })

  const _fetchPerguruanTinggiOptions = (inputValue: string, callback: any) => {
    axiosInstance.get<GetUniversitiesByNameResponse>(`/backend/proyek/university?query=${inputValue}`).then((res) => {
      callback(res.data.data)
    })
  }

  const fetchPerguruanTinggiOptions = debounce(_fetchPerguruanTinggiOptions, 500)

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
                fieldName="namaLengkap"
                register={register}
                label="Nama lengkap"
                placeholder="Nama lengkap"
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
              <NumberInput
                fieldName="NIDN"
                register={register}
                label="NIDN"
                placeholder="NIDN"
                validation={requiredValidation}
                errors={errors}
              ></NumberInput>
              <AsyncSelectInput
                control={control}
                fieldName="perguruanTinggi"
                label="Perguruan Tinggi"
                placeholder="Perguruan Tinggi"
                rules={requiredValidation}
                loadOptions={fetchPerguruanTinggiOptions}
              ></AsyncSelectInput>
              <TextInput
                fieldName="programStudi"
                register={register}
                label="Program studi"
                placeholder="Program studi"
                validation={requiredValidation}
                errors={errors}
              ></TextInput>
              <SelectInput
                control={control}
                fieldName="jenisKelamin"
                label="Jenis kelamin"
                placeholder="Pilih jenis kelamin"
                rules={requiredValidation}
                options={[
                  { label: "Laki-laki", value: "Laki-laki" },
                  { label: "Perempuan", value: "Perempuan" }
                ]}
              ></SelectInput>
              <Grid alignItems="center" templateColumns="1fr 1fr" gap={6} mt="32px">
                <DateInput
                  mt="0"
                  fieldName="tanggalLahir"
                  register={register}
                  label="Tanggal lahir"
                  validation={requiredValidation}
                  errors={errors}
                ></DateInput>
                <NumberInput
                  mt="0"
                  fieldName="nomorKTP"
                  register={register}
                  label="Nomor KTP"
                  placeholder="Nomor KTP"
                  validation={requiredValidation}
                  errors={errors}
                ></NumberInput>
              </Grid>
              <NumberInput
                fieldName="nomorTelepon"
                register={register}
                label="Nomor telepon"
                placeholder="Nomor telepon"
                validation={requiredValidation}
                errors={errors}
              ></NumberInput>
              <TextArea
                fieldName="alamatLengkap"
                register={register}
                label="Alamat lengkap"
                placeholder="Alamat lengkap"
                validation={requiredValidation}
                errors={errors}
              ></TextArea>
              <TextInput
                fieldName="acadstaffLink"
                register={register}
                label="Link Acadstaff Anda"
                validation={acadstaffLinkValidation}
                placeholder="cth: https://acadstaff.ugm.ac.id/example_user"
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

export default RegisterPeneliti
