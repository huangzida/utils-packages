# @zid-utils/format-utils

> 数字、货币、百分比格式化工具库 (Number, currency, and percentage formatting utilities)

## 安装

```bash
pnpm add @zid-utils/format-utils
```

## 概述

提供数字、货币、百分比、文件大小等数据的格式化功能，适用于财务数据展示、用户界面数字显示、数据仪表盘等场景。

## 使用方法

```typescript
import {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatBytes,
} from "@zid-utils/format-utils";

// 数字格式化
formatNumber(1234567); // "1,234,567"
formatNumber(1234.567, { decimals: 2 }); // "1,234.57"

// 货币格式化
formatCurrency(1234.56, "CNY"); // "¥1,234.56"
formatCurrency(1234.56, "USD"); // "$1,234.56"

// 百分比格式化
formatPercent(0.756); // "75.6%"
formatPercent(0.1234, 2); // "12.34%"

// 文件大小格式化
formatBytes(1024); // "1.00 KB"
formatBytes(1024 * 1024); // "1.00 MB"
```

## 数字格式化

### formatNumber

格式化数字（支持千分位、小数位）。

```typescript
function formatNumber(
  num: number,
  options?: NumberFormatOptions
): string
```

**参数**:

- `num`: 要格式化的数字
- `options`: 格式化选项

```typescript
interface NumberFormatOptions {
  decimals?: number;      // 小数位数
  thousands?: string;    // 千分位分隔符
  decimal?: string;      // 小数点符号
  locale?: Locale;       // 地区设置
}

type Locale = "en-US" | "zh-CN" | "zh-HK";
```

**示例**:

```typescript
// 基础用法
formatNumber(1234567); // "1,234,567"
formatNumber(1234.567); // "1,234.567"

// 自定义小数位
formatNumber(1234.567, { decimals: 2 }); // "1,234.57"

// 自定义分隔符
formatNumber(1234567, { thousands: " " }); // "1 234 567"
formatNumber(1234567, { thousands: "." }); // "1.234.567"

// 自定义小数点
formatNumber(1234.567, { decimal: ",", thousands: "." });
// "1.234,57"
```

### formatWithSuffix

格式化数字并添加前后缀。

```typescript
function formatWithSuffix(
  num: number,
  options?: NumberFormatOptions & {
    suffix?: string;
    prefix?: string;
  }
): string
```

**示例**:

```typescript
formatWithSuffix(1234, { suffix: "元" }); // "1,234元"
formatWithSuffix(1234, { prefix: "¥" }); // "¥1,234"
formatWithSuffix(1234, { prefix: "$", decimals: 2 }); // "$1,234.00"
```

### abbreviateNumber

数字缩写（K、W、M、B）。

```typescript
function abbreviateNumber(num: number): string
```

**示例**:

```typescript
abbreviateNumber(1000); // "1K"
abbreviateNumber(15000); // "15K"
abbreviateNumber(100000); // "10W"
abbreviateNumber(1500000); // "150W"
abbreviateNumber(1000000); // "1M"
abbreviateNumber(1500000000); // "1.5B"
```

### parseFormattedNumber

解析格式化的数字。

```typescript
function parseFormattedNumber(formatted: string): number
```

**示例**:

```typescript
parseFormattedNumber("1,234,567"); // 1234567
parseFormattedNumber("1.234,57"); // 1234.57
parseFormattedNumber("1 234 567"); // 1234567
```

## 数学运算

### round

四舍五入。

```typescript
function round(num: number, decimals?: number): number
```

**参数**:

- `num`: 要四舍五入的数字
- `decimals`: 小数位数，默认 `0`

**示例**:

```typescript
round(3.14159); // 3
round(3.14159, 2); // 3.14
round(3.14159, 3); // 3.142
round(2.5); // 3
```

### clamp

限制数值在范围内。

```typescript
function clamp(num: number, min: number, max: number): number
```

**参数**:

- `num`: 要限制的数字
- `min`: 最小值
- `max`: 最大值

**示例**:

```typescript
clamp(5, 0, 10); // 5
clamp(-5, 0, 10); // 0
clamp(15, 0, 10); // 10
```

## 货币格式化

### formatCurrency

格式化货币显示。

```typescript
function formatCurrency(
  amount: number,
  currency?: string,
  locale?: Locale
): string
```

**参数**:

- `amount`: 金额
- `currency`: 货币代码（默认 `"CNY"`）
- `locale`: 地区设置（默认 `"zh-CN"`）

**支持的货币**:

常见货币代码：`CNY`, `USD`, `EUR`, `GBP`, `JPY`, `KRW`, `HKD`, `TWD` 等

**示例**:

```typescript
// 人民币
formatCurrency(1234.56, "CNY"); // "¥1,234.56"
formatCurrency(1234.56, "CNY", "zh-CN"); // "¥1,234.56"

// 美元
formatCurrency(1234.56, "USD"); // "$1,234.56"
formatCurrency(1234.56, "USD", "en-US"); // "$1,234.56"

// 欧元
formatCurrency(1234.56, "EUR", "de-DE"); // "1.234,56 €"

// 英镑
formatCurrency(1234.56, "GBP", "en-GB"); // "£1,234.56"

// 日元（无小数）
formatCurrency(1234, "JPY"); // "¥1,234"
```

## 百分比格式化

### formatPercent

格式化百分比。

```typescript
function formatPercent(
  value: number,
  decimals?: number
): string
```

**参数**:

- `value`: 0-1 之间的小数或 0-100 的数字
- `decimals`: 小数位数，默认 `1`

**示例**:

```typescript
formatPercent(0.756); // "75.6%"
formatPercent(0.756, 2); // "75.60%"
formatPercent(75.6); // "75.6%"
formatPercent(0.1234); // "12.3%"
```

## 文件大小格式化

### formatBytes

格式化字节大小。

```typescript
function formatBytes(
  bytes: number,
  decimals?: number
): string
```

**参数**:

- `bytes`: 字节数
- `decimals`: 小数位数，默认 `2`

**示例**:

```typescript
formatBytes(0); // "0 B"
formatBytes(1024); // "1.00 KB"
formatBytes(1024 * 1024); // "1.00 MB"
formatBytes(1024 * 1024 * 1024); // "1.00 GB"
formatBytes(1024 * 1024 * 1024 * 1024); // "1.00 TB"

// 自定义小数位
formatBytes(1536, 1); // "1.5 KB"
formatBytes(1024 * 1024 * 1024, 0); // "1 GB"
```

## 时间格式化

### formatDuration

格式化时长（HH:MM:SS）。

```typescript
function formatDuration(seconds: number): string
```

**参数**:

- `seconds`: 秒数

**示例**:

```typescript
formatDuration(0); // "00:00"
formatDuration(61); // "00:01:01"
formatDuration(3661); // "01:01:01"
formatDuration(3600); // "01:00:00"
formatDuration(90061); // "25:01:01"
```

## 电话号码格式化

### formatPhone

格式化电话号码。

```typescript
function formatPhone(
  phone: string,
  format?: "CN" | "US" | "international"
): string
```

**参数**:

- `phone`: 原始电话号码
- `format`: 格式化类型，默认 `"CN"`

**示例**:

```typescript
// 中国格式
formatPhone("13812345678"); // "138-1234-5678"
formatPhone("13812345678", "CN"); // "138-1234-5678"

// 美国格式
formatPhone("13812345678", "US"); // "(138) 123-4567"

// 国际格式
formatPhone("13812345678", "international"); // "+86 138-1234-5678"
```

## 信用卡格式化

### formatCreditCard

格式化信用卡号。

```typescript
function formatCreditCard(cardNumber: string): string
```

**示例**:

```typescript
formatCreditCard("1234567890123456"); // "1234 5678 9012 3456"
formatCreditCard("123456789012"); // "1234 5678 9012"
```

## 银行账号格式化

### formatBankAccount

格式化银行账号。

```typescript
function formatBankAccount(account: string): string
```

**示例**:

```typescript
formatBankAccount("1234567890123456"); // "1234 5678 9012 3456"
formatBankAccount("1234567890123456789"); // "1234 5678 9012 3456 789"
```

## 实际应用示例

### 财务数据展示

```typescript
import { formatCurrency, formatNumber } from "@zid-utils/format-utils";

interface Transaction {
  amount: number;
  currency: string;
}

const transactions: Transaction[] = [
  { amount: 1234.56, currency: "CNY" },
  { amount: 789.01, currency: "USD" },
  { amount: 2345.67, currency: "EUR" },
];

transactions.forEach((t) => {
  console.log(formatCurrency(t.amount, t.currency));
});
// ¥1,234.56
// $789.01
// €2,345.67
```

### 数据仪表盘

```typescript
import { abbreviateNumber, formatPercent } from "@zid-utils/format-utils";

const stats = {
  pageViews: 1234567,
  users: 98765,
  conversionRate: 0.0345,
  revenue: 2345678.9,
};

console.log(`访问量: ${abbreviateNumber(stats.pageViews)}`);
// "访问量: 123W"

console.log(`用户数: ${abbreviateNumber(stats.users)}`);
// "用户数: 10W"

console.log(`转化率: ${formatPercent(stats.conversionRate)}`);
// "转化率: 3.5%"

console.log(`收入: ${abbreviateNumber(stats.revenue)}元`);
// "收入: 235W元"
```

### 文件管理器

```typescript
import { formatBytes } from "@zid-utils/format-utils";

interface File {
  name: string;
  size: number;
}

const files: File[] = [
  { name: "document.pdf", size: 1024 * 1024 * 2.5 },
  { name: "image.jpg", size: 1024 * 512 },
  { name: "video.mp4", size: 1024 * 1024 * 1024 * 1.5 },
];

files.forEach((file) => {
  console.log(`${file.name}: ${formatBytes(file.size)}`);
});
// document.pdf: 2.50 MB
// image.jpg: 512.00 KB
// video.mp4: 1.50 GB
```

### 表单输入验证

```typescript
import { parseFormattedNumber } from "@zid-utils/format-utils";

function validateNumberInput(input: string): number | null {
  const parsed = parseFormattedNumber(input);

  if (isNaN(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

// 用户输入 "1,234.56"
const value = validateNumberInput("1,234.56");
if (value !== null) {
  console.log(`有效数字: ${value}`); // 1234.56
}
```

### 音频/视频时长

```typescript
import { formatDuration } from "@zid-utils/format-utils";

// 视频时长 3661 秒
const duration = 3661;
console.log(`视频时长: ${formatDuration(duration)}`);
// "视频时长: 01:01:01"

// 音频时长 125 秒
const audioDuration = 125;
console.log(`音频时长: ${formatDuration(audioDuration)}`);
// "音频时长: 00:02:05"
```

### 百分比进度条

```typescript
import { formatPercent, clamp } from "@zid-utils/format-utils";

function updateProgressBar(progress: number) {
  const clamped = clamp(progress, 0, 100);
  const formatted = formatPercent(clamped / 100, 0);

  console.log(`进度: ${formatted}`);
  // 更新 UI 进度条宽度为 clamped%
}

updateProgressBar(75.5); // "进度: 76%"
updateProgressBar(105); // "进度: 100%"
updateProgressBar(-10); // "进度: 0%"
```

## License

MIT
