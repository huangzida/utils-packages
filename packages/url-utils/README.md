# @zid-utils/url-utils

> URL 操作工具函数库 (URL manipulation utility functions)

## 安装

```bash
pnpm add @zid-utils/url-utils
```

## 概述

提供 URL 解析、构建、参数操作等功能，包括查询参数处理、路径操作、域名提取等。

## 使用方法

```typescript
import {
  parseUrl,
  buildUrl,
  getParam,
  setParam,
  getAllParams,
  extractDomain,
} from "@zid-utils/url-utils";

// 解析 URL
parseUrl("https://example.com/path?a=1&b=2");

// 构建 URL
buildUrl("https://example.com", { a: "1", b: "2" });
// "https://example.com?a=1&b=2"

// 获取参数
getParam("https://example.com?a=1", "a"); // "1"

// 设置参数
setParam("https://example.com", "c", "3");
// "https://example.com?c=3"

// 提取域名
extractDomain("https://www.example.com/path");
// "www.example.com"
```

## 解析和构建

### parseUrl

解析 URL 字符串。

```typescript
function parseUrl(url: string): URL | null
```

**返回值**: 原生 `URL` 对象，解析失败返回 `null`

**示例**:

```typescript
const url = parseUrl("https://example.com/path?a=1&b=2");

if (url) {
  console.log(url.protocol); // "https:"
  console.log(url.host); // "example.com"
  console.log(url.pathname); // "/path"
  console.log(url.search); // "?a=1&b=2"
}
```

### buildUrl

构建带参数的 URL。

```typescript
function buildUrl(base: string, params?: Record<string, any>): string
```

**参数**:

- `base`: 基础 URL
- `params`: 查询参数对象

**示例**:

```typescript
buildUrl("https://example.com", { a: 1, b: 2 });
// "https://example.com?a=1&b=2"

buildUrl("https://example.com/search", { q: "hello", page: 1 });
// "https://example.com/search?q=hello&page=1"
```

## 参数操作

### getParam

获取 URL 中的单个参数。

```typescript
function getParam(url: string, key: string): string | null
```

**参数**:

- `url`: URL 字符串
- `key`: 参数名

**返回值**: 参数值，不存在返回 `null`

**示例**:

```typescript
getParam("https://example.com?a=1&b=2", "a"); // "1"
getParam("https://example.com?a=1", "b"); // null
getParam("https://example.com?a=hello+world", "a"); // "hello world"
```

### setParam

设置 URL 中的参数。

```typescript
function setParam(url: string, key: string, value: string): string
```

**返回值**: 更新后的 URL 字符串

**示例**:

```typescript
setParam("https://example.com?a=1", "a", "2");
// "https://example.com?a=2"

setParam("https://example.com", "b", "3");
// "https://example.com?b=3"
```

### deleteParam

删除 URL 中的参数。

```typescript
function deleteParam(url: string, key: string): string
```

**示例**:

```typescript
deleteParam("https://example.com?a=1&b=2", "a");
// "https://example.com?b=2"

deleteParam("https://example.com?a=1", "a");
// "https://example.com"
```

### getAllParams

获取 URL 中的所有参数。

```typescript
function getAllParams(url: string): Record<string, string>
```

**示例**:

```typescript
getAllParams("https://example.com?a=1&b=2");
// { a: "1", b: "2" }

getAllParams("https://example.com?a=1&a=2");
// { a: "2" } (最后一个值)
```

### hasParam

检查 URL 是否包含指定参数。

```typescript
function hasParam(url: string, key: string): boolean
```

**示例**:

```typescript
hasParam("https://example.com?a=1", "a"); // true
hasParam("https://example.com?a=1", "b"); // false
```

## Hash 操作

### getHash

获取 URL 中的 hash。

```typescript
function getHash(url: string): string
```

**返回值**: hash 值（不包含 `#`）

**示例**:

```typescript
getHash("https://example.com/page#section1");
// "section1"

getHash("https://example.com#anchor");
// "anchor"

getHash("https://example.com");
// "" (空字符串)
```

### setHash

设置 URL 中的 hash。

```typescript
function setHash(url: string, hash: string): string
```

**返回值**: 更新后的 URL

**示例**:

```typescript
setHash("https://example.com", "section1");
// "https://example.com#section1"

setHash("https://example.com#old", "new");
// "https://example.com#new"
```

## URL 类型检查

### isAbsoluteUrl

检查是否为绝对 URL。

```typescript
function isAbsoluteUrl(url: string): boolean
```

**示例**:

```typescript
isAbsoluteUrl("https://example.com"); // true
isAbsoluteUrl("http://example.com"); // true
isAbsoluteUrl("/path/to/page"); // false
isAbsoluteUrl("relative/path"); // false
```

### isRelativeUrl

检查是否为相对 URL。

```typescript
function isRelativeUrl(url: string): boolean
```

**示例**:

```typescript
isRelativeUrl("/path/to/page"); // true
isRelativeUrl("relative/path"); // true
isRelativeUrl("https://example.com"); // false
```

## URL 路径操作

### joinUrl

连接 URL 路径部分。

```typescript
function joinUrl(...parts: string[]): string
```

**示例**:

```typescript
joinUrl("https://example.com", "api", "users");
// "https://example.com/api/users"

joinUrl("https://example.com/", "/api/", "/users");
// "https://example.com/api/users"

joinUrl("base", "path1", "path2");
// "base/path1/path2"
```

### extractDomain

提取 URL 的域名。

```typescript
function extractDomain(url: string): string | null
```

**返回值**: 域名，解析失败返回 `null`

**示例**:

```typescript
extractDomain("https://www.example.com/path");
// "www.example.com"

extractDomain("https://api.example.com:8080");
// "api.example.com"

extractDomain("invalid-url");
// null
```

### extractPath

提取 URL 的路径。

```typescript
function extractPath(url: string): string | null
```

**返回值**: 路径，解析失败返回 `null`

**示例**:

```typescript
extractPath("https://example.com/api/users");
// "/api/users"

extractPath("https://example.com/page?a=1");
// "/page"

extractPath("invalid-url");
// null
```

### removeTrailingSlash

移除 URL 末尾的斜杠。

```typescript
function removeTrailingSlash(url: string): string
```

**示例**:

```typescript
removeTrailingSlash("https://example.com/page/");
// "https://example.com/page"

removeTrailingSlash("https://example.com/page");
// "https://example.com/page"

removeTrailingSlash("https://example.com/");
// "https://example.com"
```

### addTrailingSlash

添加 URL 末尾的斜杠。

```typescript
function addTrailingSlash(url: string): string
```

**示例**:

```typescript
addTrailingSlash("https://example.com/page");
// "https://example.com/page/"

addTrailingSlash("https://example.com/page/");
// "https://example.com/page/"
```

## 类型定义

```typescript
interface UrlParts {
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  username?: string;
  password?: string;
  origin?: string;
}
```

## 实际应用示例

### API 请求构建

```typescript
import { buildUrl } from "@zid-utils/url-utils";

function createApiUrl(
  baseUrl: string,
  endpoint: string,
  params?: Record<string, any>
) {
  return buildUrl(`${baseUrl}${endpoint}`, params);
}

const apiUrl = createApiUrl(
  "https://api.example.com",
  "/users",
  { page: 1, limit: 20, sort: "name" }
);
// "https://api.example.com/users?page=1&limit=20&sort=name"
```

### URL 参数管理

```typescript
import { getParam, setParam, deleteParam } from "@zid-utils/url-utils";

const currentUrl = "https://example.com?page=1&limit=10";

// 更新参数
const newUrl = setParam(currentUrl, "page", "2");
// "https://example.com?page=2&limit=10"

// 获取参数
const page = getParam(currentUrl, "page"); // "1"

// 删除参数
const cleanUrl = deleteParam(currentUrl, "limit");
// "https://example.com?page=1"
```

### 分页组件

```typescript
import { setParam, getParam } from "@zid-utils/url-utils";

function updatePage(url: string, page: number): string {
  return setParam(url, "page", String(page));
}

function getCurrentPage(url: string): number {
  const page = getParam(url, "page");
  return page ? parseInt(page, 10) : 1;
}

// 使用
const listUrl = "https://example.com/products?category=electronics&page=1";
const nextPageUrl = updatePage(listUrl, 2);
// "https://example.com/products?category=electronics&page=2"
```

### SPA 路由管理

```typescript
import { extractDomain, joinUrl } from "@zid-utils/url-utils";

function createRoute(baseUrl: string, ...segments: string[]): string {
  return joinUrl(baseUrl, ...segments);
}

const routes = {
  home: createRoute("https://app.example.com", ""),
  dashboard: createRoute("https://app.example.com", "dashboard"),
  profile: createRoute("https://app.example.com", "user", "profile"),
  settings: createRoute("https://app.example.com", "settings"),
};

console.log(routes.profile);
// "https://app.example.com/user/profile"
```

### 搜索功能

```typescript
import { buildUrl, getParam } from "@zid-utils/url-utils";

function buildSearchUrl(baseUrl: string, query: string, filters: Record<string, string>) {
  const params = {
    q: query,
    ...filters,
  };

  return buildUrl(baseUrl, params);
}

function extractSearchQuery(url: string): string {
  return getParam(url, "q") || "";
}

const searchUrl = buildSearchUrl(
  "https://example.com/search",
  "typescript tutorial",
  { language: "en", level: "beginner" }
);
// "https://example.com/search?q=typescript+tutorial&language=en&level=beginner"

extractSearchQuery(searchUrl);
// "typescript tutorial"
```

### Hash 路由管理

```typescript
import { getHash, setHash } from "@zid-utils/url-utils";

function navigateToSection(url: string, section: string): string {
  return setHash(url, section);
}

function getCurrentSection(url: string): string {
  return getHash(url);
}

// 使用
const pageUrl = "https://example.com/docs";
const sectionUrl = navigateToSection(pageUrl, "installation");
// "https://example.com/docs#installation"

getCurrentSection(sectionUrl);
// "installation"
```

### URL 规范化

```typescript
import {
  removeTrailingSlash,
  isAbsoluteUrl,
  extractDomain,
} from "@zid-utils/url-utils";

function normalizeUrl(url: string): string {
  let normalized = removeTrailingSlash(url);

  if (!isAbsoluteUrl(normalized)) {
    normalized = `https://${normalized}`;
  }

  return normalized;
}

normalizeUrl("https://example.com/");
// "https://example.com"

normalizeUrl("example.com");
// "https://example.com"
```

## License

MIT
