const months: string[] = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
]

export const getDisplayTime = (epochTime: number) => {
  const now = new Date()
  const notificationDate = new Date(epochTime)
  const date = notificationDate.getDate()
  const hours =
    notificationDate.getHours().toString().length == 1
      ? `0${notificationDate.getHours()}`
      : notificationDate.getHours()
  const minutes =
    notificationDate.getMinutes().toString().length == 1
      ? `0${notificationDate.getMinutes()}`
      : notificationDate.getMinutes()
  const month = notificationDate.getMonth()

  if (now.getDate() == date) {
    return `Hari ini, ${date}.${minutes} WIB`
  }

  return `${date} ${months[month]} ${notificationDate.getFullYear()}, ${hours}.${minutes} WIB`
}
