# @zid-utils/color-utils

> 颜色转换工具函数库 (Color conversion and manipulation utilities)

## 安装

```bash
pnpm add @zid-utils/color-utils
```

## 概述

提供颜色格式转换、颜色调整和操作功能，包括 HEX、RGB、HSL 之间的相互转换，颜色亮度调整，对比度计算等。

## 使用方法

```typescript
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  lighten,
  darken,
  isDark,
} from "@zid-utils/color-utils";

// 格式转换
hexToRgb("#FF5733"); // { r: 255, g: 87, b: 51 }
rgbToHex({ r: 255, g: 87, b: 51 }); // "#ff5733"
rgbToHsl({ r: 255, g: 87, b: 51 }); // { h: 11, s: 100, l: 60 }
hslToRgb({ h: 11, s: 100, l: 60 }); // { r: 255, g: 87, b: 51 }

// 颜色调整
lighten("#FF5733", 20); // "#ff8c66"
darken("#FF5733", 20); // "#cc4528"

// 颜色判断
isDark("#000000"); // true
isDark("#FFFFFF"); // false
```

## 格式转换

### hexToRgb

十六进制转 RGB。

```typescript
function hexToRgb(hex: string): RGB | null
```

**参数**:

- `hex`: 十六进制颜色值（支持 `#RGB`, `#RRGGBB`, `RGB`, `RRGGBB`）

**返回值**: RGB 对象，解析失败返回 `null`

**示例**:

```typescript
hexToRgb("#FF5733"); // { r: 255, g: 87, b: 51 }
hexToRgb("FF5733"); // { r: 255, g: 87, b: 51 }
hexToRgb("#F53"); // { r: 255, g: 85, b: 51 }
hexToRgb("invalid"); // null
```

### rgbToHex

RGB 转十六进制。

```typescript
function rgbToHex(rgb: RGB): string
```

**参数**:

- `rgb`: RGB 对象

**返回值**: 十六进制颜色字符串（带 `#`）

**示例**:

```typescript
rgbToHex({ r: 255, g: 87, b: 51 }); // "#ff5733"
rgbToHex({ r: 0, g: 0, b: 0 }); // "#000000"
rgbToHex({ r: 255, g: 255, b: 255 }); // "#ffffff"
```

### rgbToHsl

RGB 转 HSL。

```typescript
function rgbToHsl(rgb: RGB): HSL
```

**参数**:

- `rgb`: RGB 对象

**返回值**: HSL 对象

**示例**:

```typescript
rgbToHsl({ r: 255, g: 87, b: 51 });
// { h: 11, s: 100, l: 60 }

rgbToHsl({ r: 0, g: 0, b: 0 });
// { h: 0, s: 0, l: 0 }
```

### hslToRgb

HSL 转 RGB。

```typescript
function hslToRgb(hsl: HSL): RGB
```

**参数**:

- `hsl`: HSL 对象

**返回值**: RGB 对象

**示例**:

```typescript
hslToRgb({ h: 11, s: 100, l: 60 });
// { r: 255, g: 87, b: 51 }

hslToRgb({ h: 0, s: 0, l: 0 });
// { r: 0, g: 0, b: 0 }
```

### hexToHsl

十六进制转 HSL。

```typescript
function hexToHsl(hex: string): HSL | null
```

**示例**:

```typescript
hexToHsl("#FF5733"); // { h: 11, s: 100, l: 60 }
hexToHsl("invalid"); // null
```

### hslToHex

HSL 转十六进制。

```typescript
function hslToHex(hsl: HSL): string
```

**示例**:

```typescript
hslToHex({ h: 11, s: 100, l: 60 }); // "#ff5733"
```

## 验证函数

### isValidHex

验证十六进制颜色格式。

```typescript
function isValidHex(hex: string): boolean
```

**示例**:

```typescript
isValidHex("#FF5733"); // true
isValidHex("FF5733"); // true
isValidHex("#F53"); // true
isValidHex("invalid"); // false
isValidHex("#GGG"); // false
```

### isValidRgb

验证 RGB 颜色值。

```typescript
function isValidRgb(rgb: RGB): boolean
```

**示例**:

```typescript
isValidRgb({ r: 255, g: 87, b: 51 }); // true
isValidRgb({ r: 255, g: 87, b: 51, a: 0.5 }); // true
isValidRgb({ r: 256, g: 87, b: 51 }); // false
isValidRgb({ r: -1, g: 87, b: 51 }); // false
```

## 颜色调整

### lighten

提亮颜色。

```typescript
function lighten(color: string, amount: number): string
```

**参数**:

- `color`: 颜色值（HEX、RGB 或 HSL）
- `amount`: 提亮百分比（0-100）

**返回值**: 提亮后的 HEX 颜色值

**示例**:

```typescript
lighten("#FF5733", 20); // "#ff8c66"
lighten("#FF5733", 50); // "#ffb399"
lighten("rgb(255, 87, 51)", 30); // "#ff9966"
```

### darken

加深颜色。

```typescript
function darken(color: string, amount: number): string
```

**参数**:

- `color`: 颜色值
- `amount`: 加深百分比（0-100）

**返回值**: 加深后的 HEX 颜色值

**示例**:

```typescript
darken("#FF5733", 20); // "#cc4528"
darken("#FF5733", 50); // "#992b1a"
darken("hsl(11, 100%, 60%)", 30); // "#99331a"
```

### saturate

提高颜色饱和度。

```typescript
function saturate(color: string, amount: number): string
```

**示例**:

```typescript
saturate("#808080", 20); // "#999999"
saturate("rgb(128, 128, 128)", 50); // "#b3b3b3"
```

### desaturate

降低颜色饱和度。

```typescript
function desaturate(color: string, amount: number): string
```

**示例**:

```typescript
desaturate("#FF5733", 50); // "#bf6652"
desaturate("rgb(255, 87, 51)", 30); // "#d9705a"
```

### fadeIn

增加颜色透明度。

```typescript
function fadeIn(color: string, amount: number): string
```

**参数**:

- `color`: 颜色值
- `amount`: 透明度增加值（0-1）

**返回值**: 带 alpha 的 RGBA 字符串

**示例**:

```typescript
fadeIn("#FF5733", 0.2); // "rgba(255, 87, 51, 0.2)"
fadeIn("rgb(255, 87, 51)", 0.5); // "rgba(255, 87, 51, 0.5)"
```

## 颜色比较和操作

### getContrastRatio

获取两个颜色的对比度。

```typescript
function getContrastRatio(color1: string, color2: string): number
```

**返回值**: 对比度值（1-21）

**WCAG 标准**:

- AA 级文字: 对比度 ≥ 4.5
- AA 级大文字: 对比度 ≥ 3
- AAA 级文字: 对比度 ≥ 7
- AAA 级大文字: 对比度 ≥ 4.5

**示例**:

```typescript
getContrastRatio("#000000", "#FFFFFF"); // 21
getContrastRatio("#000000", "#777777"); // 5.74
getContrastRatio("#FF5733", "#FFFFFF"); // 3.94
```

### isDark

判断是否为深色。

```typescript
function isDark(color: string): boolean
```

**示例**:

```typescript
isDark("#000000"); // true
isDark("#333333"); // true
isDark("#666666"); // false
isDark("#FFFFFF"); // false
```

### isLight

判断是否为浅色。

```typescript
function isLight(color: string): boolean
```

**示例**:

```typescript
isLight("#FFFFFF"); // true
isLight("#CCCCCC"); // true
isLight("#666666"); // false
isLight("#000000"); // false
```

### mix

混合两种颜色。

```typescript
function mix(color1: string, color2: string, weight?: number): string
```

**参数**:

- `color1`: 颜色 1
- `color2`: 颜色 2
- `weight`: 颜色 1 的权重（0-1），默认 `0.5`

**返回值**: 混合后的 HEX 颜色值

**示例**:

```typescript
mix("#FF0000", "#0000FF"); // "#800080" (紫色)
mix("#FF0000", "#0000FF", 0.75); // "#400080" (偏向红色)
mix("#FF0000", "#0000FF", 0.25); // "#a00080" (偏向蓝色)
```

### randomColor

生成随机颜色。

```typescript
function randomColor(): string
```

**返回值**: 随机 HEX 颜色值

**示例**:

```typescript
randomColor(); // "#a3f4c8"
randomColor(); // "#72b9d4"
randomColor(); // "#e5a2c3"
```

### nameToHex

颜色名称转十六进制。

```typescript
function nameToHex(name: string): string | null
```

**参数**:

- `name`: 颜色名称（如 `"red"`, `"blue"`, `"white"`）

**示例**:

```typescript
nameToHex("red"); // "#ff0000"
nameToHex("blue"); // "#0000ff"
nameToHex("white"); // "#ffffff"
nameToHex("invalid"); // null
```

## 类型定义

```typescript
interface RGB {
  r: number;  // 0-255
  g: number;  // 0-255
  b: number;  // 0-255
}

interface RGBA extends RGB {
  a: number;  // 0-1
}

interface HSL {
  h: number;  // 0-360
  s: number;  // 0-100
  l: number;  // 0-100
}

interface HSLA extends HSL {
  a: number;  // 0-1
}

interface HSV {
  h: number;  // 0-360
  s: number;  // 0-100
  v: number;  // 0-100
}
```

## 实际应用示例

### 主题颜色生成

```typescript
import { lighten, darken, hexToHsl, hslToHex } from "@zid-utils/color-utils";

function generateThemeColors(primaryColor: string) {
  const [h, s, l] = hexToHsl(primaryColor);

  return {
    primary: primaryColor,
    primaryLight: lighten(primaryColor, 10),
    primaryDark: darken(primaryColor, 10),
    primaryLighter: lighten(primaryColor, 20),
    primaryDarker: darken(primaryColor, 20),
  };
}

const theme = generateThemeColors("#FF5733");
console.log(theme);
// {
//   primary: "#FF5733",
//   primaryLight: "#ff704d",
//   primaryDark: "#cc4528",
//   primaryLighter: "#ff8c66",
//   primaryDarker: "#99331a"
// }
```

### 自动文本颜色

```typescript
import { isDark, hexToRgb, rgbToHex } from "@zid-utils/color-utils";

function getTextColor(bgColor: string): string {
  const rgb = hexToRgb(bgColor);

  if (!rgb) return "#000000";

  if (isDark(bgColor)) {
    return "#FFFFFF";
  } else {
    return "#000000";
  }
}

// 使用
const buttonBg = "#1A1A1A";
const textColor = getTextColor(buttonBg); // "#FFFFFF"

const cardBg = "#FF5733";
const cardTextColor = getTextColor(cardBg); // "#000000"
```

### 颜色可访问性检查

```typescript
import { getContrastRatio } from "@zid-utils/color-utils";

function checkAccessibility(
  foreground: string,
  background: string
): {
  ratio: number;
  level: "AAA" | "AA" | "AA Large" | "Fail";
} {
  const ratio = getContrastRatio(foreground, background);

  let level: "AAA" | "AA" | "AA Large" | "Fail";

  if (ratio >= 7) {
    level = "AAA";
  } else if (ratio >= 4.5) {
    level = "AA";
  } else if (ratio >= 3) {
    level = "AA Large";
  } else {
    level = "Fail";
  }

  return { ratio, level };
}

const result = checkAccessibility("#000000", "#FFFFFF");
console.log(result);
// { ratio: 21, level: "AAA" }

const result2 = checkAccessibility("#CCCCCC", "#FFFFFF");
console.log(result2);
// { ratio: 1.6, level: "Fail" }
```

### 渐变生成

```typescript
import { hexToHsl, hslToHex } from "@zid-utils/color-utils";

function generateGradient(
  color1: string,
  color2: string,
  steps: number
): string[] {
  const hsl1 = hexToHsl(color1);
  const hsl2 = hexToHsl(color2);

  if (!hsl1 || !hsl2) return [];

  const gradient: string[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const h = hsl1.h + (hsl2.h - hsl1.h) * t;
    const s = hsl1.s + (hsl2.s - hsl1.s) * t;
    const l = hsl1.l + (hsl2.l - hsl1.l) * t;

    gradient.push(hslToHex({ h, s, l }));
  }

  return gradient;
}

const rainbow = generateGradient("#FF0000", "#0000FF", 10);
console.log(rainbow);
// ["#ff0000", "#e81c1c", ...]
```

### UI 组件样式

```typescript
import { lighten, darken, mix } from "@zid-utils/color-utils";

function createButtonStyles(baseColor: string) {
  return {
    base: {
      backgroundColor: baseColor,
      color: isDark(baseColor) ? "#FFFFFF" : "#000000",
    },
    hover: {
      backgroundColor: lighten(baseColor, 10),
    },
    active: {
      backgroundColor: darken(baseColor, 10),
    },
    disabled: {
      backgroundColor: mix(baseColor, "#CCCCCC", 0.5),
      opacity: 0.6,
    },
    focus: {
      boxShadow: `0 0 0 3px ${mix(baseColor, "#FFFFFF", 0.3)}`,
    },
  };
}
```

### 随机调色板生成

```typescript
import { randomColor, hexToHsl, hslToHex, lighten, darken } from "@zid-utils/color-utils";

function generatePalette(baseColor?: string) {
  const base = baseColor || randomColor();
  const [h, s, l] = hexToHsl(base);

  return {
    base,
    lighter: hslToHex({ h, s, l: Math.min(l + 20, 100) }),
    darker: hslToHex({ h, s, l: Math.max(l - 20, 0) }),
    muted: hslToHex({ h, s: s * 0.5, l }),
    accent: hslToHex({ h: (h + 30) % 360, s, l }),
  };
}

const palette = generatePalette("#FF5733");
console.log(palette);
// {
//   base: "#FF5733",
//   lighter: "#ff8c66",
//   darker: "#cc4528",
//   muted: "#bf6652",
//   accent: "#ffc233"
// }
```

## License

MIT
