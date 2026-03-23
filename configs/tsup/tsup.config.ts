import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  minify: false,
  treeshake: true,
})
