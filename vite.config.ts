import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  base: '/hunarkahlon-dev/',
  plugins: [remix({
    basename: '/hunarkahlon-dev/',
    buildEnd({ viteConfig: { build: { outDir }, isProduction, }}) {
      if (!isProduction) {
        return
      }

      copyFileSync(
        join(outDir, 'index.html'),
        join(outDir, '404.html'),
      )
    },
    ssr: false,
  }), tsconfigPaths()],
});
