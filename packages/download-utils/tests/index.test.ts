import { describe, it, expect } from 'vitest'
import type { DownloadOptions } from '../src/index'

describe('@zid-utils/download-utils', () => {
  describe('DownloadOptions interface', () => {
    it('should accept string source', () => {
      const options: DownloadOptions = {
        source: 'https://example.com/file.pdf',
        fileName: 'test.pdf',
      }
      expect(options.source).toBe('https://example.com/file.pdf')
      expect(options.fileName).toBe('test.pdf')
    })

    it('should accept Blob source', () => {
      const blob = new Blob(['test'])
      const options: DownloadOptions<Blob> = {
        source: blob,
        fileName: 'test.txt',
      }
      expect(options.source).toBe(blob)
    })

    it('should have optional target', () => {
      const options: DownloadOptions = {
        source: 'url',
      }
      expect(options.target).toBeUndefined()
    })
  })

  describe('download utilities exist', () => {
    it('should export downloadByUrl function', async () => {
      const mod = await import('../src/index')
      expect(typeof mod.downloadByUrl).toBe('function')
    })

    it('should export downloadByBlob function', async () => {
      const mod = await import('../src/index')
      expect(typeof mod.downloadByBlob).toBe('function')
    })

    it('should export downloadByBase64 function', async () => {
      const mod = await import('../src/index')
      expect(typeof mod.downloadByBase64).toBe('function')
    })

    it('should export downloadFileFromUrl function', async () => {
      const mod = await import('../src/index')
      expect(typeof mod.downloadFileFromUrl).toBe('function')
    })

    it('should export downloadFileFromBlob function', async () => {
      const mod = await import('../src/index')
      expect(typeof mod.downloadFileFromBlob).toBe('function')
    })

    it('should export downloadFileFromBase64 function', async () => {
      const mod = await import('../src/index')
      expect(typeof mod.downloadFileFromBase64).toBe('function')
    })

    it('should export urlToBase64 function', async () => {
      const mod = await import('../src/index')
      expect(typeof mod.urlToBase64).toBe('function')
    })

    it('should export triggerDownload function', async () => {
      const mod = await import('../src/index')
      expect(typeof mod.triggerDownload).toBe('function')
    })
  })
})
