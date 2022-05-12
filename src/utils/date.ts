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

const getHoursDigit = (date: Date) => {
  return date.getHours().toString().length == 1 ? `0${date.getHours()}` : date.getHours()
}

const getMinutesDigit = (date: Date) => {
  return date.getMinutes().toString().length == 1 ? `0${date.getMinutes()}` : date.getMinutes()
}

const getMonthDigit = (month: number) => {
  return month.toString().length == 1 ? `0${month}` : month.toString()
}

export const getDisplayTime = (epochTime: number) => {
  const now = new Date()
  const notificationDate = new Date(epochTime)
  const date = notificationDate.getDate()
  const hours = getHoursDigit(notificationDate)
  const minutes = getMinutesDigit(notificationDate)
  const month = notificationDate.getMonth()

  if (now.getDate() == date) {
    return `Hari ini, ${hours}.${minutes} WIB`
  }

  if (now.getDate() - 1 == date) {
    return `Kemarin ${hours}.${minutes} WIB`
  }

  return `${date} ${months[month]} ${notificationDate.getFullYear()}, ${hours}.${minutes} WIB`
}

export const getLogbookDisplayTime = (epochTime: number) => {
  const now = new Date()
  const logbookDate = new Date(epochTime)
  if (now.getDate() == logbookDate.getDate()) {
    if (now.getHours() == logbookDate.getHours()) {
      const minutesToDisplay = now.getMinutes() - logbookDate.getMinutes()
      return `${minutesToDisplay} menit lalu`
    }
    const hourToDisplay = now.getHours() - logbookDate.getHours()
    return `${hourToDisplay} jam lalu`
  }

  const hours = getHoursDigit(logbookDate)
  const minutes = getMinutesDigit(logbookDate)
  const date = logbookDate.getDate()
  const month = logbookDate.getMonth()

  if (now.getDate() - 1 == logbookDate.getDate()) {
    return `Kemarin ${hours}.${minutes} WIB`
  }

  return `${date} ${months[month]} ${logbookDate.getFullYear()}, ${hours}.${minutes} WIB`
}

export const getWaktuKegiatanLogbook = (epochTime: number) => {
  const logbookDate = new Date(epochTime)
  const month = logbookDate.getMonth() + 1
  const displayMonth = getMonthDigit(month)
  return `${logbookDate.getDate()}/${displayMonth}/${logbookDate.getFullYear()}`
}

export const getCommentDisplayTime = (epochTime: number) => {
  const now = new Date()
  const commentDate = new Date(epochTime)

  if (now.getDate() == commentDate.getDate()) {
    if (now.getHours() == commentDate.getHours()) {
      const minutes = now.getMinutes() - commentDate.getMinutes()
      if (minutes == 0) return "Baru saja"
      return `${minutes} menit lalu`
    }
    if (now.getHours() - commentDate.getDate() == 1 && now.getMinutes() - commentDate.getMinutes() >= -1) {
      const minutes = 60 - commentDate.getMinutes() + now.getMinutes()
      return `${minutes} menit lalu`
    }
    const hours = now.getHours() - commentDate.getHours()
    return `${hours} jam lalu`
  }

  if (now.getDate() - commentDate.getDate() == 1) {
    const hours = 24 - commentDate.getHours() + now.getHours()
    return `${hours} jam lalu`
  }

  const date = commentDate.getDate()
  const month = commentDate.getMonth()
  const hours = getHoursDigit(commentDate)
  const minutes = getMinutesDigit(commentDate)

  return `${date} ${months[month]} ${commentDate.getFullYear()}, ${hours}.${minutes} WIB`
}
