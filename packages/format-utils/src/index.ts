export type Locale = 'en-US' | 'zh-CN' | 'zh-HK'

const LOCALE_CONFIG: Record<Locale, { thousands: string; decimal: string }> = {
  'en-US': { thousands: ',', decimal: '.' },
  'zh-CN': { thousands: ',', decimal: '.' },
  'zh-HK': { thousands: ',', decimal: '.' },
}

export interface NumberFormatOptions {
  decimals?: number
  thousands?: string
  decimal?: string
  locale?: Locale
}

export const formatNumber = (
  num: number,
  options: NumberFormatOptions = {},
): string => {
  const {
    decimals = 0,
    thousands = ',',
    decimal = '.',
  } = options

  const fixed = num.toFixed(decimals)
  const [intPart, decPart] = fixed.split('.')

  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands)

  return decPart ? `${formatted}${decimal}${decPart}` : formatted
}

export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: Locale = 'en-US',
): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    CNY: '¥',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    KRW: '₩',
    HKD: 'HK$',
  }

  const symbol = symbols[currency] || currency
  const decimals = ['JPY', 'KRW'].includes(currency) ? 0 : 2
  return `${symbol}${formatNumber(amount, { locale, decimals })}`
}

export const formatPercent = (
  value: number,
  decimals: number = 0,
): string => {
  return `${(value * 100).toFixed(decimals)}%`
}

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export const formatPhone = (
  phone: string,
  format: 'CN' | 'US' | 'international' = 'CN',
): string => {
  const digits = phone.replace(/\D/g, '')

  if (format === 'CN') {
    if (digits.length === 11) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
    }
  }

  if (format === 'US') {
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    }
  }

  if (format === 'international') {
    if (digits.startsWith('86') && digits.length === 13) {
      return `+86 ${digits.slice(2, 5)} ${digits.slice(5, 9)} ${digits.slice(9)}`
    }
    if (digits.length === 11) {
      return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    }
  }

  return phone
}

export const formatIdCard = (id: string): string => {
  const digits = id.replace(/\D/g, '')
  if (digits.length === 18) {
    return `${digits.slice(0, 6)} ${digits.slice(6, 10)} ${digits.slice(10, 14)} ${digits.slice(14)}`
  }
  if (digits.length === 15) {
    return `${digits.slice(0, 6)} ${digits.slice(6, 12)} ${digits.slice(12)}`
  }
  return id
}

export const formatCreditCard = (cardNumber: string): string => {
  const digits = cardNumber.replace(/\D/g, '')
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

export const formatBankAccount = (account: string): string => {
  return account.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

export const formatWithSuffix = (
  num: number,
  options: NumberFormatOptions & { suffix?: string; prefix?: string } = {},
): string => {
  const { suffix = '', prefix = '', ...rest } = options
  const formatted = formatNumber(num, rest)
  return `${prefix}${formatted}${suffix}`
}

export const abbreviateNumber = (num: number): string => {
  if (num < 1000) return num.toString()
  if (num < 10000) return `${(num / 1000).toFixed(1)}K`
  if (num < 1000000) return `${(num / 10000).toFixed(1)}W`
  if (num < 10000000) return `${(num / 1000000).toFixed(1)}M`
  return `${(num / 10000000).toFixed(1)}B`
}

export const parseFormattedNumber = (formatted: string): number => {
  return parseFloat(formatted.replace(/[^\d.-]/g, ''))
}

export const round = (num: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max)
}
