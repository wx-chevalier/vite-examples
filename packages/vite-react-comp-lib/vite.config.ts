import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import { PluginOption, UserConfigExport } from 'vite'
import { name } from './package.json'

const plugins: any[] = [
  react() /* _importToCdn */,
  dts({
    insertTypesEntry: true,
  }),
]

export default defineConfig({
  plugins,
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name,
      formats: ['es', 'umd'],
      fileName: (format) => `${name}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
