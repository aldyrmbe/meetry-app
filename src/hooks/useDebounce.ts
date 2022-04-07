import { useState, useEffect } from "react"

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export default useDebounce
