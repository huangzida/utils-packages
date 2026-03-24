# @zid-utils/time-utils

> 时间格式化工具库 (Time formatting utility library)

## 安装

```bash
pnpm add @zid-utils/time-utils
```

## 概述

提供时间格式化和相对时间显示功能，适用于音频/视频播放器、社交媒体时间戳、日志时间格式化等场景。

## 使用方法

```typescript
import { padZero, formatTime, formatTimeDetail, formatRelativeTime } from "@zid-utils/time-utils";

// 数字补零
padZero(5, 3); // "005"
padZero(9); // "09"

// 格式化秒为时间字符串
formatTime(3661); // "01:01:01"
formatTime(61); // "01:01"

// 格式化秒为详细对象
formatTimeDetail(90061);
// {
//   hours: "01",
//   minutes: "01",
//   seconds: "01",
//   displayTime: "01:01:01"
// }

// 相对时间（中文）
formatRelativeTime(Date.now() - 60000, "zh-CN"); // "1 分钟前"
formatRelativeTime(Date.now() - 3600000, "zh-CN"); // "1 小时前"

// 相对时间（英文）
formatRelativeTime(Date.now() - 60000, "en-US"); // "1 minute ago"
formatRelativeTime(Date.now() - 3600000, "en-US"); // "1 hour ago"
```

## 函数详解

### padZero

数字前补零。

```typescript
function padZero(num: number, length?: number): string
```

**参数**:
- `num`: 需要补零的数字
- `length`: 补零后的总长度，默认值为 `2`

**示例**:

```typescript
padZero(5); // "05"
padZero(5, 3); // "005"
padZero(12, 3); // "012"
padZero(123, 3); // "123"
```

### formatTime

格式化秒为时间字符串。

```typescript
function formatTime(seconds: number): string
```

**参数**:
- `seconds`: 秒数

**示例**:

```typescript
formatTime(0); // "00:00"
formatTime(61); // "01:01"
formatTime(3661); // "01:01:01"
formatTime(3600); // "01:00:00"
formatTime(90061); // "25:01:01"
```

### formatTimeDetail

格式化秒为包含时、分、秒的详细对象。

```typescript
function formatTimeDetail(seconds: number): FormattedTimeDetail
```

**返回值类型**:

```typescript
interface FormattedTimeDetail {
  hours: string;      // 小时（补零）
  minutes: string;   // 分钟（补零）
  seconds: string;   // 秒（补零）
  displayTime: string; // 显示时间（HH:MM:SS）
}
```

**示例**:

```typescript
formatTimeDetail(3661);
// {
//   hours: "00",
//   minutes: "01",
//   seconds: "01",
//   displayTime: "00:01:01"
// }

formatTimeDetail(90061);
// {
//   hours: "01",
//   minutes: "01",
//   seconds: "01",
//   displayTime: "01:01:01"
// }
```

### formatRelativeTime

格式化相对时间。

```typescript
function formatRelativeTime(timestamp: number, locale?: Locale): string
```

**参数**:
- `timestamp`: 时间戳（毫秒）
- `locale`: 语言环境，默认 `"zh-CN"`

**支持的地区**:

```typescript
type Locale = "zh-CN" | "en-US";
```

**中文格式输出**:

```typescript
formatRelativeTime(Date.now() - 5000, "zh-CN"); // "刚刚"
formatRelativeTime(Date.now() - 60000, "zh-CN"); // "1 分钟前"
formatRelativeTime(Date.now() - 3600000, "zh-CN"); // "1 小时前"
formatRelativeTime(Date.now() - 86400000, "zh-CN"); // "1 天前"
formatRelativeTime(Date.now() - 2592000000, "zh-CN"); // "1 个月前"
formatRelativeTime(Date.now() - 31536000000, "zh-CN"); // "1 年前"
```

**英文格式输出**:

```typescript
formatRelativeTime(Date.now() - 5000, "en-US"); // "just now"
formatRelativeTime(Date.now() - 60000, "en-US"); // "1 minute ago"
formatRelativeTime(Date.now() - 3600000, "en-US"); // "1 hour ago"
formatRelativeTime(Date.now() - 86400000, "en-US"); // "1 day ago"
formatRelativeTime(Date.now() - 2592000000, "en-US"); // "1 month ago"
formatRelativeTime(Date.now() - 31536000000, "en-US"); // "1 year ago"
```

## 实际应用示例

### 音频播放器时间显示

```typescript
import { formatTimeDetail } from "@zid-utils/time-utils";

function updatePlayerUI(currentTime: number, duration: number) {
  const current = formatTimeDetail(Math.floor(currentTime));
  const total = formatTimeDetail(Math.floor(duration));

  console.log(`${current.displayTime} / ${total.displayTime}`);
  // 例如: "03:45 / 05:30"
}

updatePlayerUI(225, 330); // "03:45 / 05:30"
```

### 社交媒体时间戳

```typescript
import { formatRelativeTime } from "@zid-utils/time-utils";

const posts = [
  { id: 1, title: "新动态", timestamp: Date.now() - 300000 },
  { id: 2, title: "昨天的消息", timestamp: Date.now() - 86400000 },
  { id: 3, title: "一周前的文章", timestamp: Date.now() - 604800000 },
];

posts.forEach((post) => {
  const timeAgo = formatRelativeTime(post.timestamp, "zh-CN");
  console.log(`${post.title} - ${timeAgo}`);
});
// 新动态 - 5 分钟前
// 昨天的消息 - 1 天前
// 一周前的文章 - 1 周前
```

### 倒计时显示

```typescript
import { formatTime } from "@zid-utils/time-utils";

function createCountdown(targetTime: number) {
  const update = () => {
    const now = Date.now();
    const remaining = Math.max(0, Math.floor((targetTime - now) / 1000));

    console.log(formatTime(remaining));

    if (remaining > 0) {
      requestAnimationFrame(update);
    }
  };

  update();
}

// 1 小时倒计时
createCountdown(Date.now() + 3600000);
```

## License

MIT
