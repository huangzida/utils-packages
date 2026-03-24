# @zid-utils/fetch-utils

> 文件获取和下载工具库 (File fetching and download utilities)

## 安装

```bash
pnpm add @zid-utils/fetch-utils
```

## 概述

提供多种方式的文件下载功能，包括 URL 下载、Base64 下载、Blob 下载、图片下载等，适用于文件导出、文档下载、离线数据保存等场景。

## 使用方法

```typescript
import {
  downloadByUrl,
  downloadByBlob,
  downloadByBase64,
  urlToBase64,
} from "@zid-utils/fetch-utils";

// 从 URL 下载
await downloadByUrl("https://example.com/file.pdf", "document.pdf");

// 从 Base64 下载
downloadByBase64(base64Data, "document.pdf", "application/pdf");

// 从 Blob 下载
downloadByBlob(blob, "document.pdf");

// 图片 URL 转 Base64
const base64 = await urlToBase64("https://example.com/image.jpg");
```

## 文件下载

### downloadByUrl

从 URL 下载文件。

```typescript
function downloadByUrl(
  url: string,
  fileName?: string
): Promise<void>
```

**参数**:

- `url`: 文件 URL
- `fileName`: 保存的文件名（可选）

**示例**:

```typescript
await downloadByUrl("https://example.com/reports/sales.pdf", "sales-report.pdf");
await downloadByUrl("https://example.com/images/photo.jpg");
```

### downloadByBlob

从 Blob 下载文件。

```typescript
function downloadByBlob(
  blob: Blob,
  fileName: string
): void
```

**参数**:

- `blob`: Blob 对象
- `fileName`: 保存的文件名

**示例**:

```typescript
const blob = new Blob(["Hello World"], { type: "text/plain" });
downloadByBlob(blob, "hello.txt");
```

### downloadByBase64

从 Base64 数据下载文件。

```typescript
function downloadByBase64(
  base64: string,
  fileName: string,
  mimeType?: string
): void
```

**参数**:

- `base64`: Base64 编码的数据
- `fileName`: 保存的文件名
- `mimeType`: MIME 类型（可选，根据扩展名自动推断）

**示例**:

```typescript
downloadByBase64(
  "SGVsbG8gV29ybGQ=",
  "hello.txt",
  "text/plain"
);

downloadByBase64(
  "data:image/png;base64,iVBORw0KGgo...",
  "image.png"
);
```

## 图片工具

### urlToBase64

将图片 URL 转为 Base64。

```typescript
function urlToBase64(
  url: string,
  mimeType?: string
): Promise<string>
```

**参数**:

- `url`: 图片 URL
- `mimeType`: MIME 类型（可选）

**返回值**: Base64 编码的字符串（带 data URI 前缀）

**示例**:

```typescript
const base64 = await urlToBase64("https://example.com/avatar.jpg");
console.log(base64); // "data:image/jpeg;base64,/9j/4AAQ..."

const pngBase64 = await urlToBase64("https://example.com/logo.png", "image/png");
```

### downloadFileFromImageUrl

从图片 URL 下载图片。

```typescript
function downloadFileFromImageUrl(
  options: DownloadOptions<string>
): Promise<void>
```

**参数**:

- `options`: 下载选项
  - `source`: 图片 URL
  - `fileName`: 保存的文件名
  - `target`: 可选，打开目标

**示例**:

```typescript
await downloadFileFromImageUrl({
  source: "https://example.com/photo.jpg",
  fileName: "my-photo.jpg",
});
```

## 底层函数

### triggerDownload

触发文件下载（通过创建隐藏的 `<a>` 标签）。

```typescript
function triggerDownload(
  href: string,
  fileName?: string,
  revokeDelay?: number
): void
```

**参数**:

- `href`: 文件地址或 Blob URL
- `fileName`: 保存的文件名（可选）
- `revokeDelay`: 延迟撤销 Blob URL 的时间（毫秒），默认 `0`

**示例**:

```typescript
triggerDownload("https://example.com/file.pdf", "document.pdf");
```

### downloadFileFromUrl

从 URL 下载文件。

```typescript
function downloadFileFromUrl(
  options: DownloadOptions
): Promise<void>
```

**参数**:

- `options`: 下载选项
  - `source`: 文件 URL
  - `fileName`: 保存的文件名（可选）
  - `target`: 可选，打开目标

**示例**:

```typescript
await downloadFileFromUrl({
  source: "https://example.com/document.docx",
  fileName: "my-document.docx",
});
```

### downloadFileFromBlob

从 Blob 下载文件。

```typescript
function downloadFileFromBlob(
  options: DownloadOptions<Blob>
): void
```

**参数**:

- `options`: 下载选项
  - `source`: Blob 对象
  - `fileName`: 保存的文件名

**示例**:

```typescript
const response = await fetch("https://example.com/data.json");
const blob = await response.blob();

downloadFileFromBlob({
  source: blob,
  fileName: "data.json",
});
```

### downloadFileFromBlobPart

从 BlobPart 下载文件。

```typescript
function downloadFileFromBlobPart(
  options: DownloadOptions<BlobPart>
): void
```

**参数**:

- `options`: 下载选项
  - `source`: BlobPart 对象
  - `fileName`: 保存的文件名

**示例**:

```typescript
downloadFileFromBlobPart({
  source: "Hello World",
  fileName: "hello.txt",
});
```

### downloadFileFromBase64

从 Base64 数据下载文件。

```typescript
function downloadFileFromBase64(
  options: DownloadOptions<string>
): void
```

**参数**:

- `options`: 下载选项
  - `source`: Base64 数据
  - `fileName`: 保存的文件名

**示例**:

```typescript
downloadFileFromBase64({
  source: "SGVsbG8gV29ybGQ=",
  fileName: "hello.txt",
});
```

## 类型定义

```typescript
interface DownloadOptions<T = string> {
  fileName?: string;  // 文件名
  source: T;        // 源（URL 或 Base64）
  target?: string;  // 打开目标
}
```

## 实际应用示例

### 导出 CSV 数据

```typescript
import { downloadByBlob } from "@zid-utils/fetch-utils";

function exportToCSV(data: Record<string, any>[], filename: string) {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  downloadByBlob(blob, `${filename}.csv`);
}

const users = [
  { name: "张三", age: 28, city: "北京" },
  { name: "李四", age: 32, city: "上海" },
];

exportToCSV(users, "users");
```

### 导出 JSON 数据

```typescript
import { downloadByBlob } from "@zid-utils/fetch-utils";

function exportToJSON(data: any, filename: string) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  downloadByBlob(blob, `${filename}.json`);
}

const config = {
  theme: "dark",
  language: "zh-CN",
  notifications: true,
};

exportToJSON(config, "config");
```

### 下载图片

```typescript
import { downloadByUrl } from "@zid-utils/fetch-utils";

async function downloadImage(url: string, filename: string) {
  try {
    await downloadByUrl(url, filename);
    console.log("图片下载成功");
  } catch (error) {
    console.error("下载失败:", error);
  }
}

await downloadImage(
  "https://example.com/photos/vacation.jpg",
  "vacation-photo.jpg"
);
```

### Canvas 保存为图片

```typescript
import { downloadByBlob } from "@zid-utils/fetch-utils";

function saveCanvasAsImage(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (blob) {
      downloadByBlob(blob, filename);
    }
  }, "image/png");
}

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
saveCanvasAsImage(canvas, "my-drawing.png");
```

### Base64 PDF 下载

```typescript
import { downloadByBase64 } from "@zid-utils/fetch-utils";

async function downloadPDF(base64Data: string, filename: string) {
  downloadByBase64(base64Data, filename, "application/pdf");
}

// 使用
const pdfBase64 = "JVBERi0xLjQK..."; // PDF 的 Base64 数据
downloadPDF(pdfBase64, "document.pdf");
```

### 批量文件下载

```typescript
import { downloadByUrl } from "@zid-utils/fetch-utils";

async function batchDownload(
  files: Array<{ url: string; filename: string }>
) {
  for (const file of files) {
    try {
      await downloadByUrl(file.url, file.filename);
      console.log(`下载成功: ${file.filename}`);
    } catch (error) {
      console.error(`下载失败: ${file.filename}`, error);
    }
  }
}

const filesToDownload = [
  { url: "https://example.com/file1.pdf", filename: "report1.pdf" },
  { url: "https://example.com/file2.pdf", filename: "report2.pdf" },
];

await batchDownload(filesToDownload);
```

### 图片离线缓存

```typescript
import { urlToBase64, downloadByBase64 } from "@zid-utils/fetch-utils";

async function cacheImage(url: string, filename: string) {
  try {
    const base64 = await urlToBase64(url);

    localStorage.setItem(`image_${filename}`, base64);
    console.log(`图片已缓存: ${filename}`);
  } catch (error) {
    console.error("缓存失败:", error);
  }
}

async function loadCachedImage(filename: string) {
  const base64 = localStorage.getItem(`image_${filename}`);

  if (base64) {
    downloadByBase64(base64, filename);
  }
}
```

### 生成并下载文本文件

```typescript
import { downloadByBlob } from "@zid-utils/fetch-utils";

function downloadTextFile(content: string, filename: string, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  downloadByBlob(blob, filename);
}

// 下载 Markdown 文件
const markdown = "# 标题\n\n这是内容";
downloadTextFile(markdown, "document.md", "text/markdown");

// 下载 HTML 文件
const html = "<html><body><h1>Hello</h1></body></html>";
downloadTextFile(html, "page.html", "text/html");
```

### API 响应下载

```typescript
import { downloadByBlob } from "@zid-utils/fetch-utils";

async function downloadApiFile(endpoint: string, filename: string) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  downloadByBlob(blob, filename);
}

// 使用
await downloadApiFile("/api/export/users", "users.xlsx");
```

## 浏览器兼容性

所有函数都基于标准的浏览器 API，兼容所有现代浏览器。

## 安全提示

1. **跨域限制**: 某些 CDN 可能禁止跨域下载
2. **文件大小**: 大文件下载可能需要更长的时间和更多内存
3. **Blob 清理**: 长时间运行的页面应该定期清理 Blob URL 以释放内存
4. **用户交互**: 建议在用户触发的事件（如点击）中调用下载函数，避免被浏览器拦截

## License

MIT
