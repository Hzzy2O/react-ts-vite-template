import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { resolve } from "path";
import createPlugin from "./build/plugin"
import { wrapperEnv } from './build/utils';

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@/": pathResolve("src") + "/",
        "#/": pathResolve("types") + "/"
      }
    },
    plugins: createPlugin(viteEnv,isBuild),
    server: {
      host: true,
      port: VITE_PORT,
      proxy: {
        
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true
        }
      },
      modules: {
        // 样式小驼峰转化,
        localsConvention: "camelCase"
      }
    },
    optimizeDeps: {},
    build: {
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
};
