export const padZero = (num: number, length: number = 2): string => {
  return num.toString().padStart(length, '0')
}

export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '00:00'

  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${padZero(hours)}:${padZero(mins)}:${padZero(secs)}`
  }

  return `${padZero(mins)}:${padZero(secs)}`
}

export interface FormattedTimeDetail {
  hours: string
  minutes: string
  seconds: string
  displayTime: string
}

export const formatTimeDetail = (seconds: number): FormattedTimeDetail => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  const hoursStr = padZero(hours)
  const minutesStr = padZero(minutes)
  const secondsStr = padZero(secs)

  return {
    hours: hoursStr,
    minutes: minutesStr,
    seconds: secondsStr,
    displayTime: `${hoursStr}:${minutesStr}:${secondsStr}`,
  }
}

export type Locale = 'zh-CN' | 'en-US'

const RELATIVE_TIME_STRINGS: Record<Locale, { justNow: string; ago: string; later: string }> = {
  'zh-CN': {
    justNow: '刚刚',
    ago: '前',
    later: '后',
  },
  'en-US': {
    justNow: 'just now',
    ago: ' ago',
    later: ' later',
  },
}

export const formatRelativeTime = (
  timestamp: number,
  locale: Locale = 'zh-CN',
): string => {
  const now = Date.now()
  const diff = Math.abs(now - timestamp)
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  const isFuture = timestamp > now
  const { justNow, ago, later } = RELATIVE_TIME_STRINGS[locale]

  if (seconds < 60) {
    return justNow
  }

  if (locale === 'zh-CN') {
    if (minutes < 60) return `${minutes}分钟${isFuture ? later : ago}`
    if (hours < 24) return `${hours}小时${isFuture ? later : ago}`
    if (days < 30) return `${days}天${isFuture ? later : ago}`
    if (months < 12) return `${months}个月${isFuture ? later : ago}`
    return `${years}年${isFuture ? later : ago}`
  } else {
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}${isFuture ? later : ago}`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''}${isFuture ? later : ago}`
    if (days < 30) return `${days} day${days > 1 ? 's' : ''}${isFuture ? later : ago}`
    if (months < 12) return `${months} month${months > 1 ? 's' : ''}${isFuture ? later : ago}`
    return `${years} year${years > 1 ? 's' : ''}${isFuture ? later : ago}`
  }
}
