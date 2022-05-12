import { Box, Button, Checkbox, Divider, Flex, FormControl, FormLabel, Text } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import { TextArea } from "@components/input/MeetryInput"
import { requiredValidation } from "src/utils/input-validation/validation"
import { useEffect } from "react"
import { useFieldArray } from "react-hook-form"
import { AddIcon } from "@chakra-ui/icons"
import { Role } from "src/service/user"

type KriteriaKerjasamaProps = {
  role: Role
  register: any
  errors: any
  prevStep: () => void
  connectorRef: React.RefObject<HTMLDivElement>
  control: any
  isLoading: boolean
}

const KriteriaKerjasama = ({
  role,
  register,
  errors,
  prevStep,
  connectorRef,
  control,
  isLoading
}: KriteriaKerjasamaProps) => {
  const { fields, remove, append } = useFieldArray({ control, name: "kebutuhanProyek" })

  useEffect(() => {
    const node = connectorRef.current
    window.scrollTo({
      behavior: "smooth",
      top: node?.offsetTop! - 10
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <Text fontWeight="bold">Kebutuhan {index + 1}</Text>
            <TextArea
              fieldName={`kebutuhanProyek.${index}.kebutuhanProyek`}
              register={register}
              label="Kebutuhan-kebutuhan proyek"
              placeholder="Jelaskan kebutuhan-kebutuhan untuk mewujudkan karya atau proyek ini"
              validation={requiredValidation}
              errors={errors}
              helperText="Jelaskan dengan rinci"
            />
            <TextArea
              fieldName={`kebutuhanProyek.${index}.bentukKolaborasi`}
              register={register}
              label="Bentuk kolaborasi yang diharapkan"
              placeholder="Bagaimana bentuk kolaborasi yang Anda harapkan?"
              validation={requiredValidation}
              errors={errors}
              helperText="Jelaskan dengan rinci"
            />
            <TextArea
              fieldName={`kebutuhanProyek.${index}.penjelasanTambahan`}
              register={register}
              label="Penjelasan tambahan (opsional)"
              placeholder={`Penjelasan tambahan tentang ${role == "MITRA" ? "peneliti" : "mitra"} yang ingin dicari`}
              validation={requiredValidation}
              errors={errors}
            />
            {fields.length !== 1 && (
              <PrimaryButton mt="32px" size="sm" onClick={() => remove(index)}>
                Hapus
              </PrimaryButton>
            )}
            <Divider mt="32px" borderWidth="2px" backgroundColor="gray.200"></Divider>
            <Box mb="32px"></Box>
          </div>
        )
      })}
      <Button
        w="100%"
        size="sm"
        leftIcon={<AddIcon w="10px" mr="8px"></AddIcon>}
        onClick={() => append({ kebutuhanProyek: "", bentukKolaborasi: "", penjelasanTambahan: "" })}
        variant="ghost"
      >
        Tambah Kebutuhan Baru
      </Button>
      <FormControl>
        <Checkbox mt="32px" {...register("agreements", requiredValidation)}>
          Saya berkomitmen terhadap potensi kerja sama yang akan terjadi dan mempertanggung jawabkan keaslian proyek
          atau karya ini
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
        <PrimaryButton isLoading={isLoading} loadingText="Mengirim..." type="submit" p="10px 90px">
          Selesai
        </PrimaryButton>
      </Flex>
    </>
  )
}

export default KriteriaKerjasama
