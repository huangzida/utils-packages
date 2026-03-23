/**
 * 下载选项接口
 */
export interface DownloadOptions<T = string> {
  /** 文件名 */
  fileName?: string
  /** 源（URL 或 Base64）*/
  source: T
  /** 打开目标 */
  target?: string
}

const DEFAULT_FILENAME = 'downloaded_file'

interface OpenWindowOptions {
  noopener?: boolean
  noreferrer?: boolean
  target?: '_blank' | '_parent' | '_self' | '_top' | string
}

function openWindow(url: string, options: OpenWindowOptions = {}): void {
  const { noopener = true, noreferrer = true, target = '_blank' } = options
  const features = [noopener && 'noopener=yes', noreferrer && 'noreferrer=yes']
    .filter(Boolean)
    .join(',')

  window.open(url, target, features)
}

/**
 * 触发文件下载
 * @param href - 文件 URL 或 Blob URL
 * @param fileName - 文件名
 * @param revokeDelay - 延迟回收 URL 时间
 */
export function triggerDownload(
  href: string,
  fileName?: string,
  revokeDelay = 100,
): void {
  const defaultFileName = 'downloaded_file'
  const finalFileName = fileName || defaultFileName

  const link = document.createElement('a')
  link.href = href
  link.download = finalFileName
  link.style.display = 'none'

  if (link.download === undefined) {
    link.setAttribute('target', '_blank')
  }

  document.body.append(link)
  link.click()
  link.remove()

  setTimeout(() => URL.revokeObjectURL(href), revokeDelay)
}

function resolveFileName(url: string, fileName?: string): string {
  return fileName || url.slice(url.lastIndexOf('/') + 1) || DEFAULT_FILENAME
}

/**
 * 从 URL 下载文件
 * @param options - 下载选项
 */
export async function downloadFileFromUrl(options: DownloadOptions): Promise<void> {
  const { fileName, source, target = '_blank' } = options

  if (!source || typeof source !== 'string') {
    throw new Error('Invalid URL.')
  }

  const isChrome = window.navigator.userAgent.toLowerCase().includes('chrome')
  const isSafari = window.navigator.userAgent.toLowerCase().includes('safari')

  if (/iP/.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!')
    return
  }

  if (isChrome || isSafari) {
    triggerDownload(source, resolveFileName(source, fileName))
    return
  }
  let modifiedSource = source
  if (!modifiedSource.includes('?')) {
    modifiedSource += '?download'
  }

  openWindow(modifiedSource, { target })
}

/**
 * 从 Base64 数据下载文件
 * @param options - 下载选项
 */
export function downloadFileFromBase64(options: DownloadOptions): void {
  const { fileName, source } = options

  if (!source || typeof source !== 'string') {
    throw new Error('Invalid Base64 data.')
  }

  const resolvedFileName = fileName || DEFAULT_FILENAME
  triggerDownload(source, resolvedFileName)
}

/**
 * 从图片 URL 下载图片
 * @param options - 下载选项
 */
export async function downloadFileFromImageUrl(options: DownloadOptions): Promise<void> {
  const { fileName, source } = options

  const base64 = await urlToBase64(source)
  downloadFileFromBase64({ fileName, source: base64 })
}

/**
 * 从 Blob 下载文件
 * @param options - 下载选项
 */
export function downloadFileFromBlob(options: DownloadOptions<Blob>): void {
  const { fileName = DEFAULT_FILENAME, source } = options

  if (!(source instanceof Blob)) {
    throw new TypeError('Invalid Blob data.')
  }

  const url = URL.createObjectURL(source)
  triggerDownload(url, fileName)
}

/**
 * 从 BlobPart 下载文件
 * @param options - 下载选项
 */
export function downloadFileFromBlobPart(options: DownloadOptions<BlobPart>): void {
  const { fileName = DEFAULT_FILENAME, source } = options

  const blob =
    source instanceof Blob
      ? source
      : new Blob([source], { type: 'application/octet-stream' })

  const url = URL.createObjectURL(blob)
  triggerDownload(url, fileName)
}

/**
 * 将图片 URL 转为 Base64
 * @param url - 图片 URL
 * @param mineType - MIME 类型
 * @returns Base64 数据 URL
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('CANVAS') as HTMLCanvasElement | null
    const ctx = canvas?.getContext('2d')
    const img = new Image()
    img.crossOrigin = ''
    img.addEventListener('load', () => {
      if (!canvas || !ctx) {
        return reject(new Error('Failed to create canvas.'))
      }
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      resolve(dataURL)
    })
    img.addEventListener('error', () => {
      reject(new Error('Failed to load image.'))
    })
    img.src = url
  })
}

/** 从 URL 下载文件 */
export function downloadByUrl(url: string, fileName?: string): Promise<void> {
  return downloadFileFromUrl({ source: url, fileName })
}

/** 从 Blob 下载文件 */
export function downloadByBlob(blob: Blob, fileName: string): void {
  downloadFileFromBlob({ source: blob, fileName })
}

/** 从 Base64 下载文件 */
export function downloadByBase64(base64: string, fileName: string): void {
  downloadFileFromBase64({ source: base64, fileName })
}
