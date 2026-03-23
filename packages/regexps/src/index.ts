const IPV4_PATTERN =
  /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/

const IPV4_BYTE = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)'
const IPV6_HEX = '[0-9a-fA-F]{1,4}'
const IPV6_FULL = `(?:${IPV6_HEX}:){7}${IPV6_HEX}|:`
const IPV6_COMPRESSED = `:((?::${IPV6_HEX}){1,7}|:)|${IPV6_HEX}:((?::${IPV6_HEX}){1,6}|:)${IPV6_HEX}:((?::${IPV6_HEX}){1,5}|:)${IPV6_HEX}:((?::${IPV6_HEX}){1,4}|:)${IPV6_HEX}:((?::${IPV6_HEX}){1,3}|:)${IPV6_HEX}:((?::${IPV6_HEX}){1,2}|:)|(?:(?:${IPV4_BYTE}\\.){3}${IPV4_BYTE})|:`
const IPV6_PATTERN = new RegExp(`^${IPV6_FULL}|${IPV6_COMPRESSED}$`, 'i')

const BYTE_PATTERN =
  '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$'

/**
 * 验证邮箱地址
 */
export const isEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

/**
 * 验证 URL（支持 http, https, ftp）
 */
export const isUrl =
  /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu

/**
 * 验证 IPv4 地址
 */
export const isIpv4 = IPV4_PATTERN

/**
 * 验证 IPv6 地址
 */
export const isIpv6 = IPV6_PATTERN

/**
 * 验证 UUID 格式
 */
export const isUuid =
  /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i

/**
 * 验证 Nanoid 格式（21 个字符）
 */
export const isNanoid = /^[\w\-+!#$%&*=?^_`{|}~-]{21}$/

/**
 * 验证 Base64 编码字符串
 */
export const isByte = new RegExp(BYTE_PATTERN)

/**
 * 验证主机名
 */
export const isHostname =
  /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i

/**
 * 验证手机号（中国：支持 0/86/17951 前缀 + 11 位数字）
 */
export const isPhone = /^(0|86|17951)?(1\d{10})$/

/**
 * 验证纯数字字符串
 */
export const isNumeric = /^\d+$/

/**
 * 验证中国身份证号（15 位或 18 位）
 */
export const isIdCard =
  /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

/**
 * 验证中国邮政编码（6 位数字）
 */
export const isZipCode = /^[1-9]\d{5}(?!\d)$/

/**
 * 验证纯中文
 */
export const isChinese = /^[\u4e00-\u9fa5]+$/

/**
 * 匹配 RGBA 值
 */
export const matchRgba = /\d+(\d*\.?\d*)/g

/**
 * 匹配 HSLA 值
 */
export const matchHsla = /\d+(\.\d+)?%/g

/**
 * 匹配十六进制颜色代码
 */
export const matchHex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

/**
 * 验证同时包含数字和字母的字符串
 */
export const hasDigitAndLetter = /^(?=.*\d)(?=.*[a-zA-Z])/

/**
 * 验证包含数字、大写字母和小写字母的字符串
 */
export const hasDigitsLettersWithCase = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
