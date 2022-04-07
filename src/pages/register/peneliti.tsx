import { Box, HStack, Heading, Grid, Button, useToast } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import {
  TextInput,
  EmailInput,
  PasswordInput,
  NumberInput,
  SelectInput,
  DateInput,
  TextArea,
  FileInput
} from "@components/input/MeetryInput"
import Container from "@components/layout/Container/Container"
import Navbar from "@components/layout/Navbar/Navbar"
import Head from "next/head"
import { useForm } from "react-hook-form"
import { emailValidation, requiredValidation } from "src/utils/input-validation/validation"
import { useState } from "react"
import { RegisterPenelitiFormValues, registerPeneliti } from "src/service/register"
import { useRouter } from "next/router"

const RegisterPeneliti = () => {
  const [isSending, setSending] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<RegisterPenelitiFormValues>({ mode: "onChange" })

  const onSubmit = handleSubmit((data: RegisterPenelitiFormValues) => {
    registerPeneliti(data, toast, router, setSending)
  })

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
              <TextInput
                fieldName="perguruanTinggi"
                register={register}
                label="Perguruan tinggi"
                placeholder="Perguruan tinggi"
                validation={requiredValidation}
                errors={errors}
              ></TextInput>
              <TextInput
                fieldName="programStudi"
                register={register}
                label="Program studi"
                placeholder="Program studi"
                validation={requiredValidation}
                errors={errors}
              ></TextInput>
              <SelectInput
                options={[
                  {
                    value: "Pria",
                    text: "Pria"
                  },
                  {
                    value: "Wanita",
                    text: "Wanita"
                  }
                ]}
                fieldName="jenisKelamin"
                label="Jenis kelamin"
                register={register}
                placeholder="Pilih jenis kelamin"
                validation={requiredValidation}
                errors={errors}
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
              <TextArea
                fieldName="bioSingkat"
                register={register}
                label="Bio singkat"
                placeholder="Bio singkat"
                validation={requiredValidation}
                errors={errors}
              ></TextArea>
              <TextInput
                fieldName="website"
                register={register}
                label="Website (opsional)"
                placeholder="www.example.com"
              ></TextInput>
              <FileInput
                fieldName="fotoProfil"
                register={register}
                watch={watch}
                label="Foto profil (opsional)"
                placeholder="Pilih file"
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
