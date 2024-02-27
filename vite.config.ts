
import {UserConfig, ConfigEnv, loadEnv} from 'vite';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//https://github.com/element-plus/unplugin-element-plus/blob/HEAD/README.zh-CN.md
// @ts-ignore
import ElementPlus from 'unplugin-element-plus/vite'

/**
 * defineConfig作用是
 * 1. 设置环境变量
 * 2. 设置插件
 * 3. 设置别名
 * 4. 设置打包
 * 5. 设置服务器
 * 6. 设置预处理器
 * 7. 设置资源
 * 8. 设置其他
 */
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // const env = loadEnv(mode, process.cwd(), '')
  // console.log('env', env)
  return {
    plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],// 自动引入Element Plus组件
    }),
    Components({
      resolvers: [ElementPlusResolver()],// 自动引入Element Plus组件
    }),
    ElementPlus({
      // useSource: true // false, // 使用源码包
    })
    ],
    publicDir: "public",// 静态资源
    base: "./",// 部署基础
    server: {
      host: '0.0.0.0',// 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: 8112,
      open: false,//自动打开浏览器
      strictPort: false,//端口被占用直接退出
      // proxy: {}
    },
    resolve: {
      alias: {// 设置路径别名
        "@": resolve(__dirname, "./src"),
        "components": resolve(__dirname, "./src/components"),
        "api": resolve(__dirname, "./src/api"),
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // charset: false,
          additionalData: `@use "./src/assets/css/variable.scss" as *;`,// 全局变量
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  }
})