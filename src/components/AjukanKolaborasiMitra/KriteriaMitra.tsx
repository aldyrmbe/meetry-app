import { Checkbox, Divider, Flex, FormControl, Text } from "@chakra-ui/react"
import OutlinedButton from "@components/Button/OutlinedButton"
import PrimaryButton from "@components/Button/PrimaryButton"
import { TextArea } from "@components/Input/MeetryInput"
import { requiredValidation } from "@lib/utils/input-validation/validation"
import { useEffect } from "react"

interface KriteriaMitraProps {
  register: any
  errors: any
  prevStep: () => void
  connectorRef: React.RefObject<HTMLDivElement>
}

const KriteriaMitra = ({ register, errors, prevStep, connectorRef }: KriteriaMitraProps) => {
  useEffect(() => {
    const node = connectorRef.current
    window.scrollTo({
      behavior: "smooth",
      top: node?.offsetTop! - 10
    })
  }, [connectorRef])

  return (
    <>
      <Text fontWeight="bold">Kebutuhan Proyek</Text>
      <TextArea
        fieldName="kebutuhanProyek"
        register={register}
        label="Kebutuhan-kebutuhan proyek"
        placeholder="Jelaskan kebutuhan-kebutuhan untuk mewujudkan karya atau proyek ini"
        validation={requiredValidation}
        errors={errors}
        helperText="Jelaskan dengan rinci"
      ></TextArea>
      <TextArea
        fieldName="bentukKolaborasi"
        register={register}
        label="Bentuk kolaborasi yang diharapkan"
        placeholder="Bagaimana bentuk kolaborasi yang Anda harapkan?"
        validation={requiredValidation}
        errors={errors}
        helperText="Jelaskan dengan rinci"
      ></TextArea>
      <TextArea
        fieldName="penjelasanTambahanMitra"
        register={register}
        label="Penjelasan tambahan (opsional)"
        placeholder="Penjelasan tambahan tentang mitra yang ingin dicari"
        validation={requiredValidation}
        errors={errors}
      ></TextArea>
      <Divider mt="32px" borderWidth="2px" backgroundColor="gray.200"></Divider>
      <FormControl>
        <Checkbox mt="32px" {...register("agreements", requiredValidation)}>
          Saya berkomitmen terhadap potensi kerja sama yang akan terjadi dan mempertanggung jawabkan
          keaslian proyek atau karya ini
        </Checkbox>
        {errors?.["agreements"]?.message && (
          <Text mt="10px" color="red.500" fontWeight="500">
            Mohon centang pernyataan ini
          </Text>
        )}
      </FormControl>
      <Flex w="100%" mt="64px" justify="space-between">
        <OutlinedButton p="10px 97px" onClick={prevStep}>
          Kembali
        </OutlinedButton>
        <PrimaryButton type="submit" p="10px 90px">
          Selesai
        </PrimaryButton>
      </Flex>
    </>
  )
}

export default KriteriaMitra
