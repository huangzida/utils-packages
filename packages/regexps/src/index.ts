const IPV4_PATTERN =
  /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

const IPV4_BYTE = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)";
const IPV6_HEX = "[0-9a-fA-F]{1,4}";
const IPV6_FULL = `(?:${IPV6_HEX}:){7}${IPV6_HEX}|:`;
const IPV6_COMPRESSED = `:((?::${IPV6_HEX}){1,7}|:)|${IPV6_HEX}:((?::${IPV6_HEX}){1,6}|:)${IPV6_HEX}:((?::${IPV6_HEX}){1,5}|:)${IPV6_HEX}:((?::${IPV6_HEX}){1,4}|:)${IPV6_HEX}:((?::${IPV6_HEX}){1,3}|:)${IPV6_HEX}:((?::${IPV6_HEX}){1,2}|:)|(?:(?:${IPV4_BYTE}\\.){3}${IPV4_BYTE})|:`;
const IPV6_PATTERN = new RegExp(`^${IPV6_FULL}|${IPV6_COMPRESSED}$`, "i");

const BYTE_PATTERN =
  "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$";

export const isEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export const isUrl =
  /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;

export const isIpv4 = IPV4_PATTERN;

export const isIpv6 = IPV6_PATTERN;

export const isUuid =
  /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

export const isNanoid = /^[\w\-\\+\\!\#\$\\%\\&\*\/\=\?\^_\`\{\|\}\~\-]{21}$/;

export const isByte = new RegExp(BYTE_PATTERN);

export const isHostname =
  /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;

export const isPhone = /^(0|86|17951)?(1\d{10})$/;

export const isNumeric = /^\d+$/;

export const isIdCard =
  /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

export const isZipCode = /^[1-9]\d{5}(?!\d)$/;

export const isChinese = /^[\u4e00-\u9fa5]+$/;

export const matchRgba = /\d+(\d*\.?\d*)/g;

export const matchHsla = /\d+(\.\d+)?%/g;

export const matchHex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

export const hasDigitAndLetter = /^(?=.*\d)(?=.*[a-zA-Z])/;

export const hasDigitsLettersWithCase = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
