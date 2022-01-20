import type { Plugin, PluginOption } from "vite";
import windiCSS from "vite-plugin-windicss";
import react from "@vitejs/plugin-react";
import { configHtmlPlugin } from "./html";
import { configCompressPlugin } from "./compress";
// import { configImageminPlugin } from "./imagemin";

export default function (viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[] | PluginOption[])[] = [
    windiCSS(),
    react()
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    //vite-plugin-imagemin
    // VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    );
  }

  return vitePlugins;
}
