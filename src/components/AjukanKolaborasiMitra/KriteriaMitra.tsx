import { Box, Button, Checkbox, Divider, Flex, FormControl, FormLabel, Text } from "@chakra-ui/react"
import OutlinedButton from "../button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import { TextArea } from "@components/input/MeetryInput"
import { requiredValidation } from "src/utils/input-validation/validation"
import { useEffect } from "react"
import { useFieldArray, Controller } from "react-hook-form"
import { Select } from "chakra-react-select"
import { groupedOptions } from "@constants/bidangMitraOptions"
import { AddIcon } from "@chakra-ui/icons"

type KriteriaMitraProps = {
  register: any
  errors: any
  prevStep: () => void
  connectorRef: React.RefObject<HTMLDivElement>
  control: any
}

const KriteriaMitra = ({ register, errors, prevStep, connectorRef, control }: KriteriaMitraProps) => {
  const { fields, remove, append } = useFieldArray({ control, name: "kebutuhanProyek" })

  useEffect(() => {
    const node = connectorRef.current
    window.scrollTo({
      behavior: "smooth",
      top: node?.offsetTop! - 10
    })
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
            ></TextArea>
            <TextArea
              fieldName={`kebutuhanProyek.${index}.bentukKolaborasi`}
              register={register}
              label="Bentuk kolaborasi yang diharapkan"
              placeholder="Bagaimana bentuk kolaborasi yang Anda harapkan?"
              validation={requiredValidation}
              errors={errors}
              helperText="Jelaskan dengan rinci"
            ></TextArea>
            <Controller
              control={control}
              name={`kebutuhanProyek.${index}.bidangMitra`}
              render={({ field }) => {
                return (
                  <FormControl mt="32px">
                    <FormLabel>Pilih bidang Mitra (pilih semua yang terkait)</FormLabel>
                    <Select
                      onChange={(e: any) => {
                        const arr = e.map((option: any) => {
                          return option.value
                        })
                        console.log(arr)
                        field.onChange(arr)
                      }}
                      isMulti
                      options={groupedOptions}
                      placeholder="Pilih bidang"
                      closeMenuOnSelect={false}
                      selectedOptionStyle="check"
                      hideSelectedOptions={false}
                    ></Select>
                  </FormControl>
                )
              }}
            ></Controller>
            <TextArea
              fieldName={`kebutuhanProyek.${index}.penjelasanTambahan`}
              register={register}
              label="Penjelasan tambahan (opsional)"
              placeholder="Penjelasan tambahan tentang mitra yang ingin dicari"
              validation={requiredValidation}
              errors={errors}
            ></TextArea>
            {fields.length !== 1 && (
              <PrimaryButton mt="32px" size="sm" onClick={() => remove(index)}>
                Hapus
              </PrimaryButton>
            )}
            <Box mb="32px"></Box>
          </div>
        )
      })}
      <Button
        w="100%"
        size="sm"
        leftIcon={<AddIcon w="10px" mr="8px"></AddIcon>}
        onClick={() => append({ kebutuhanProyek: "", bentukKolaborasi: "", bidangMitra: [""], penjelasanTambahan: "" })}
        variant="ghost"
      >
        Tambah Kebutuhan Baru
      </Button>
      <Divider mt="32px" borderWidth="2px"></Divider>
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
        <PrimaryButton type="submit" p="10px 90px">
          Selesai
        </PrimaryButton>
      </Flex>
      {/* <Text fontWeight="bold">Kebutuhan Proyek</Text>
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
        <PrimaryButton type="submit" p="10px 90px">
          Selesai
        </PrimaryButton>
      </Flex> */}
    </>
  )
}

export default KriteriaMitra
