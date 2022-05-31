import DocumentAttachmentIcon from "@components/icon/DocumentAttachmentIcon"
import ImageAttachmentIcon from "@components/icon/ImageAttachmentIcon"

const FileIcon = ({ fileName }: { fileName: string }) => {
  const imageTypes = ["jpg", "png", "jpeg"]
  const getFileType = () => {
    const split = fileName.split(".")
    return split[split.length - 1]
  }

  if (imageTypes.includes(getFileType())) {
    return <ImageAttachmentIcon />
  }
  return <DocumentAttachmentIcon />
}

export default FileIcon
