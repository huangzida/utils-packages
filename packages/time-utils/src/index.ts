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
