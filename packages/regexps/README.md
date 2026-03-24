# @zid-utils/regexps

> 常用正则表达式验证器 (Common regular expression validators)

## 安装

```bash
pnpm add @zid-utils/regexps
```

## 概述

提供常用的正则表达式模式，用于验证各类数据格式。可以直接使用这些正则进行 `test()` 操作。

## 使用方法

```typescript
import { isEmail, isUrl, isPhone } from "@zid-utils/regexps";

// 测试邮箱
isEmail.test("test@example.com"); // true
isEmail.test("invalid-email"); // false

// 测试 URL
isUrl.test("https://example.com"); // true
isUrl.test("not a url"); // false

// 测试手机号
isPhone.test("13812345678"); // true
isPhone.test("12345678901"); // false
```

## 验证函数

### 邮箱和 URL

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `isEmail` | 验证邮箱地址 | `test@example.com` |
| `isUrl` | 验证 URL（支持 http, https, ftp） | `https://example.com/path` |

### IP 地址

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `isIpv4` | 验证 IPv4 地址 | `192.168.1.1` |
| `isIpv6` | 验证 IPv6 地址 | `2001:0db8:85a3::8a2e:0370:7334` |

### 唯一标识符

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `isUuid` | 验证 UUID 格式 | `550e8400-e29b-41d4-a716-446655440000` |
| `isNanoid` | 验证 Nanoid 格式（21 个字符） | `VDbEsaI6U9FJGq7R` |
| `isByte` | 验证 Base64 编码字符串 | `SGVsbG8gV29ybGQ=` |

### 网络相关

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `isHostname` | 验证主机名 | `localhost`, `example.com` |

### 手机号和电话

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `isPhone` | 验证中国手机号 | `13812345678`, `+86 13812345678` |

### 数字和文本

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `isNumeric` | 验证纯数字字符串 | `12345`, `999` |
| `isChinese` | 验证纯中文 | `你好世界` |

### 中国身份标识

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `isIdCard` | 验证中国身份证号（15 位或 18 位） | `110101199003074519` |
| `isZipCode` | 验证中国邮政编码（6 位数字） | `100000` |

### 颜色值

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `matchHex` | 匹配十六进制颜色代码 | `#FF5733`, `#fff` |
| `matchRgba` | 匹配 RGBA 值 | `rgba(255, 87, 51, 0.5)` |
| `matchHsla` | 匹配 HSLA 值 | `hsla(11, 100%, 60%, 0.5)` |

### 密码强度

| 正则名称 | 说明 | 示例 |
|---------|------|------|
| `hasDigitAndLetter` | 验证同时包含数字和字母 | `abc123` |
| `hasDigitsLettersWithCase` | 验证包含数字、大写和小写字母 | `Abc123` |

## 实际应用示例

### 表单验证

```typescript
import {
  isEmail,
  isPhone,
  isIdCard,
  isUrl,
} from "@zid-utils/regexps";

function validateForm(data: {
  email: string;
  phone: string;
  idCard: string;
  website: string;
}) {
  const errors: string[] = [];

  if (!isEmail.test(data.email)) {
    errors.push("邮箱格式不正确");
  }

  if (!isPhone.test(data.phone)) {
    errors.push("手机号格式不正确");
  }

  if (!isIdCard.test(data.idCard)) {
    errors.push("身份证号格式不正确");
  }

  if (!isUrl.test(data.website)) {
    errors.push("网址格式不正确");
  }

  return errors;
}
```

### 数据清洗

```typescript
import { isNumeric, isChinese } from "@zid-utils/regexps";

const items = ["123", "abc", "你好", "456", "world"];

const numbers = items.filter((item) => isNumeric.test(item));
// ["123", "456"]

const chinese = items.filter((item) => isChinese.test(item));
// ["你好"]
```

## License

MIT
