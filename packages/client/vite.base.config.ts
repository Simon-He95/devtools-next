import { join, resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import VueJSX from '@vitejs/plugin-vue-jsx'

export default {
  resolve: {
    alias: {
      '~/': `${resolve(__dirname)}/src/`,
      '@vue-devtools-next/ui/theme': resolve(__dirname, '../ui/theme/index'),
      '@vue-devtools-next/ui': resolve(__dirname, '../ui/src/index'),
    },
  },
  plugins: [
    {
      name: 'local-object-transform',
      transform: {
        order: 'post',
        async handler(code) {
          return `${code}\n/* Injected with object hook! */`
        },
      },
    },
    Vue(),
    VueJSX(),
    Pages({
      pagesDir: 'pages',
    }),
    Components({
      dirs: ['./src/components'],
      dts: join(__dirname, 'components.d.ts'),
    }),
    Unocss(),
    AutoImport({
      dirs: [
        './src/utils',
        './src/composables',
      ],
      dts: join(__dirname, 'auto-imports.d.ts'),
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
    }),
  ],

}
