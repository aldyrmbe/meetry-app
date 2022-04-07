import { useState } from "react"

const useSteps = () => {
  const [activeStep, setStep] = useState<number>(1)
  const nextStep = () => {
    setStep((prevState) => {
      if (prevState === 1) return prevState + 1
      return prevState
    })
  }

  const prevStep = () => {
    setStep((prevState) => {
      if (prevState === 2) return prevState - 1
      return prevState
    })
  }

  return { activeStep, nextStep, prevStep }
}

export default useSteps
