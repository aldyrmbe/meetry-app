import { Icon } from "@chakra-ui/react"

const EllipseIcon = ({ fill }: { fill?: string }) => {
  return (
    <Icon boxSize="8px" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" fill={fill ?? "#CBD5E0"} />
    </Icon>
  )
}

export default EllipseIcon
