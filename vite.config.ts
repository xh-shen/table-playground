/*
 * @Author: shen
 * @Date: 2022-10-17 15:32:57
 * @LastEditors: shen
 * @LastEditTime: 2022-12-12 16:09:59
 * @Description:
 */
import path from 'node:path'
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Mkcert from 'vite-plugin-mkcert'
import { getPackageInfo } from 'local-pkg'
import pkg from './package.json'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig(async () => {
  const repl = await getPackageInfo('@vue/repl')
  return {
    base: '/playground/',
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
    define: {
      'import.meta.env.APP_VERSION': JSON.stringify(pkg.version),
      'import.meta.env.REPL_VERSION': JSON.stringify(repl!.version),
    },
    server: {
      https: true,
      host: true,
    },
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      AutoImport({
        dirs: [path.resolve(pathSrc, 'composables')],
        imports: ['vue', '@vueuse/core'],
        resolvers: [ElementPlusResolver()],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Components({
        dirs: [path.resolve(pathSrc, 'components')],
        resolvers: [ElementPlusResolver()],
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
      Unocss(),
      Mkcert(),
      Inspect(),
    ],
  }
})
