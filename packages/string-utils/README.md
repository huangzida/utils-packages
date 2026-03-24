# @zid-utils/string-utils

> 字符串操作工具函数库 (String manipulation utility functions)

## 安装

```bash
pnpm add @zid-utils/string-utils
```

## 概述

提供字符串转换、格式化、验证、模板等丰富的字符串处理函数，包括命名转换、HTML 转义、模板渲染等功能。

## 使用方法

```typescript
import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  escapeHtml,
  template,
} from "@zid-utils/string-utils";

// 命名转换
capitalize("hello"); // "Hello"
camelCase("hello-world"); // "helloWorld"
kebabCase("helloWorld"); // "hello-world"
snakeCase("helloWorld"); // "hello_world"

// HTML 转义
escapeHtml("<div>"); // "&lt;div&gt;"

// 模板替换
template("Hello {{name}}!", { name: "World" }); // "Hello World!"
```

## 命名转换

### capitalize

首字母大写。

```typescript
function capitalize(str: string): string
```

**示例**:

```typescript
capitalize("hello"); // "Hello"
capitalize("world"); // "World"
capitalize(""); // ""
```

### camelCase

转换为驼峰命名。

```typescript
function camelCase(str: string): string
```

**示例**:

```typescript
camelCase("hello-world"); // "helloWorld"
camelCase("hello_world"); // "helloWorld"
camelCase("hello world"); // "helloWorld"
```

### kebabCase

转换为短横线命名。

```typescript
function kebabCase(str: string): string
```

**示例**:

```typescript
kebabCase("helloWorld"); // "hello-world"
kebabCase("hello_world"); // "hello-world"
kebabCase("hello world"); // "hello-world"
```

### snakeCase

转换为下划线命名。

```typescript
function snakeCase(str: string): string
```

**示例**:

```typescript
snakeCase("helloWorld"); // "hello_world"
snakeCase("hello-world"); // "hello_world"
snakeCase("hello world"); // "hello_world"
```

### pascalCase

转换为帕斯卡命名（首字母大写的驼峰）。

```typescript
function pascalCase(str: string): string
```

**示例**:

```typescript
pascalCase("hello-world"); // "HelloWorld"
pascalCase("hello_world"); // "HelloWorld"
pascalCase("hello world"); // "HelloWorld"
```

## 空白处理

### trim

去除首尾空白。

```typescript
function trim(str: string, chars?: string): string
```

**参数**:

- `chars`: 可选，指定要移除的字符

**示例**:

```typescript
trim("  hello  "); // "hello"
trim("xxhelloxx", "x"); // "hello"
```

### trimStart

去除开头空白。

```typescript
function trimStart(str: string, chars?: string): string
```

### trimEnd

去除结尾空白。

```typescript
function trimEnd(str: string, chars?: string): string
```

## 截断和填充

### truncate

截断字符串并添加后缀。

```typescript
function truncate(
  str: string,
  length: number,
  suffix?: string
): string
```

**参数**:

- `str`: 原字符串
- `length`: 最大长度
- `suffix`: 后缀，默认 `"..."`

**示例**:

```typescript
truncate("Hello World", 5); // "Hello..."
truncate("Hello World", 5, ""); // "Hello"
truncate("Hello World", 10, "~~~"); // "Hello Worl~~~"
```

### limit

`truncate` 的别名。

```typescript
function limit(
  str: string,
  length: number,
  suffix?: string
): string
```

### padStart

在开头填充字符。

```typescript
function padStart(
  str: string,
  length: number,
  chars?: string
): string
```

**示例**:

```typescript
padStart("5", 3, "0"); // "005"
padStart("123", 6, "0"); // "000123"
```

### padEnd

在结尾填充字符。

```typescript
function padEnd(str: string, length: number, chars?: string): string
```

**示例**:

```typescript
padEnd("5", 3, "0"); // "500"
padEnd("abc", 6, "-"); // "abc---"
```

## HTML 和转义

### escapeHtml

转义 HTML 特殊字符。

```typescript
function escapeHtml(str: string): string
```

**示例**:

```typescript
escapeHtml("<div>Hello</div>"); // "&lt;div&gt;Hello&lt;/div&gt;"
escapeHtml("<script>alert('xss')</script>"); // "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;"
```

### unescapeHtml

反转义 HTML 特殊字符。

```typescript
function unescapeHtml(str: string): string
```

**示例**:

```typescript
unescapeHtml("&lt;div&gt;"); // "<div>"
unescapeHtml("&amp;"); // "&"
```

### escapeRegExp

转义正则表达式特殊字符。

```typescript
function escapeRegExp(str: string): string
```

**示例**:

```typescript
escapeRegExp("[test]"); // "\\[test\\]"
escapeRegExp(".*+?^${}()|[]\\"); // "\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\"
```

### stripHtml

移除 HTML 标签。

```typescript
function stripHtml(str: string): string
```

**示例**:

```typescript
stripHtml("<p>Hello <strong>World</strong></p>"); // "Hello World"
stripHtml("<div class='test'>Content</div>"); // "Content"
```

### slugify

转换为 URL 友好的 slug。

```typescript
function slugify(str: string): string
```

**示例**:

```typescript
slugify("Hello World!"); // "hello-world"
slugify("Café Öyster Bar"); // "cafe-oyster-bar"
slugify("  Multiple   Spaces  "); // "multiple-spaces"
```

## 字符串操作

### repeat

重复字符串指定次数。

```typescript
function repeat(str: string, count: number): string
```

**示例**:

```typescript
repeat("a", 3); // "aaa"
repeat("ab", 2); // "abab"
repeat("-", 10); // "----------"
```

### reverse

反转字符串。

```typescript
function reverse(str: string): string
```

**示例**:

```typescript
reverse("hello"); // "olleh"
reverse("12345"); // "54321"
```

### toWords

拆分为单词数组。

```typescript
function toWords(str: string): string[]
```

**示例**:

```typescript
toWords("hello world"); // ["hello", "world"]
toWords("Hello-World"); // ["Hello", "World"]
```

### toLines

按行拆分。

```typescript
function toLines(str: string): string[]
```

**示例**:

```typescript
toLines("line1\nline2\nline3"); // ["line1", "line2", "line3"]
toLines("a\nb\nc").length; // 3
```

### replaceAll

替换所有匹配的子串。

```typescript
function replaceAll(
  str: string,
  search: string,
  replacement: string
): string
```

**示例**:

```typescript
replaceAll("hello world", "l", "L"); // "heLLo worLd"
replaceAll("aaa", "a", "b"); // "bbb"
```

### removeNonPrintable

移除不可打印字符。

```typescript
function removeNonPrintable(str: string): string
```

**示例**:

```typescript
removeNonPrintable("hello\x00world"); // "helloworld"
removeNonPrintable("text\x1F\x1Emore"); // "textmore"
```

## 验证函数

### includes

检查是否包含子串。

```typescript
function includes(
  str: string,
  search: string,
  caseSensitive?: boolean
): boolean
```

**参数**:

- `caseSensitive`: 是否区分大小写，默认 `true`

**示例**:

```typescript
includes("Hello World", "World"); // true
includes("Hello World", "world"); // false
includes("Hello World", "world", false); // true
```

### startsWith

检查是否以子串开头。

```typescript
function startsWith(
  str: string,
  search: string,
  caseSensitive?: boolean
): boolean
```

**示例**:

```typescript
startsWith("Hello World", "Hello"); // true
startsWith("Hello World", "hello"); // false
startsWith("Hello World", "hello", false); // true
```

### endsWith

检查是否以子串结尾。

```typescript
function endsWith(
  str: string,
  search: string,
  caseSensitive?: boolean
): boolean
```

**示例**:

```typescript
endsWith("Hello World", "World"); // true
endsWith("Hello World", "world"); // false
endsWith("Hello World", "world", false); // true
```

### isEmpty

检查字符串是否为空。

```typescript
function isEmpty(
  str: string | null | undefined
): boolean
```

**示例**:

```typescript
isEmpty(""); // true
isEmpty("   "); // true
isEmpty(null); // true
isEmpty("hello"); // false
```

### isNotEmpty

检查字符串是否非空。

```typescript
function isNotEmpty(
  str: string | null | undefined
): boolean
```

**示例**:

```typescript
isNotEmpty("hello"); // true
isNotEmpty(""); // false
isNotEmpty(null); // false
```

## 统计和格式化

### countWords

统计单词数量。

```typescript
function countWords(str: string): number
```

**示例**:

```typescript
countWords("hello world"); // 2
countWords("Hello-World"); // 2
countWords(""); // 0
```

### countLines

统计行数。

```typescript
function countLines(str: string): number
```

**示例**:

```typescript
countLines("line1\nline2\nline3"); // 3
countLines("single line"); // 1
```

### indent

为每行添加缩进。

```typescript
function indent(str: string, spaces?: number): string
```

**参数**:

- `spaces`: 缩进空格数，默认 `2`

**示例**:

```typescript
indent("line1\nline2", 2); // "  line1\n  line2"
indent("a\nb\nc", 4); // "    a\n    b\n    c"
```

### unindent

移除公共缩进。

```typescript
function unindent(str: string): string
```

**示例**:

```typescript
unindent(`
  line1
  line2
  line3
`);
// "line1\nline2\nline3"
```

### template

替换模板变量 `{{variable}}`。

```typescript
function template(
  str: string,
  data: Record<string, any>
): string
```

**示例**:

```typescript
template("Hello {{name}}!", { name: "World" }); // "Hello World!"
template("User: {{user.name}}, Age: {{user.age}}", {
  user: { name: "张三", age: 28 },
});
// "User: 张三, Age: 28"
```

## 查询字符串

### parseQuery

解析查询字符串。

```typescript
function parseQuery(query: string): Record<string, string>
```

**示例**:

```typescript
parseQuery("a=1&b=2&c=3");
// { a: "1", b: "2", c: "3" }

parseQuery("name=John&age=30");
// { name: "John", age: "30" }
```

### buildQuery

构建查询字符串。

```typescript
function buildQuery(params: Record<string, any>): string
```

**示例**:

```typescript
buildQuery({ a: 1, b: 2, c: 3 }); // "a=1&b=2&c=3"
buildQuery({ name: "John", age: 30 }); // "name=John&age=30"
```

## 实际应用示例

### 数据库字段映射

```typescript
import { camelCase, snakeCase } from "@zid-utils/string-utils";

function mapToCamelCase(obj: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[camelCase(key)] = value;
  }
  return result;
}

function mapToSnakeCase(obj: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[snakeCase(key)] = value;
  }
  return result;
}

const dbRow = {
  user_name: "张三",
  created_at: "2024-01-01",
  is_active: true,
};

mapToCamelCase(dbRow);
// { userName: "张三", createdAt: "2024-01-01", isActive: true }
```

### 安全用户输入

```typescript
import { escapeHtml, stripHtml } from "@zid-utils/string-utils";

function sanitizeUserInput(input: string): string {
  return escapeHtml(stripHtml(input));
}

const userComment = "<script>alert('xss')</script><p>Hello</p>";
sanitizeUserInput(userComment);
// "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;Hello"
```

### URL 友好的别名生成

```typescript
import { slugify, limit } from "@zid-utils/string-utils";

function generateSlug(title: string): string {
  return limit(slugify(title), 60, "");
}

generateSlug("如何学习 TypeScript？"); // "ru-he-xue-xi-typescript"
generateSlug("10 Tips for Better Code!"); // "10-tips-for-better-code"
```

### 文本内容预览

```typescript
import { truncate, stripHtml } from "@zid-utils/string-utils";

function generateExcerpt(html: string, maxLength = 100): string {
  const plainText = stripHtml(html);
  return truncate(plainText, maxLength);
}

const article = `
  <h1>Introduction to TypeScript</h1>
  <p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.</p>
`;

generateExcerpt(article, 50);
// "TypeScript is a typed superset of JavaScript..."
```

### 多语言模板

```typescript
import { template } from "@zid-utils/string-utils";

const templates = {
  welcome: "欢迎, {{name}}!",
  orderConfirm: "您的订单 #{{orderId}} 已确认。",
  message: "{{sender}} 发送给 {{receiver}}: {{content}}",
};

function formatMessage(templateStr: string, data: Record<string, string>) {
  return template(templateStr, data);
}

formatMessage(templates.welcome, { name: "张三" });
// "欢迎, 张三!"

formatMessage(templates.message, {
  sender: "李四",
  receiver: "王五",
  content: "晚上一起吃饭吗？",
});
// "李四 发送给 王五: 晚上一起吃饭吗？"
```

## License

MIT
