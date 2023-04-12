import { resolve } from "path";
import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";
import handlebars from "vite-plugin-handlebars";
const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const entries = ["main", "about", "recruit"];
export default defineConfig({
  root,
  base: "./",
  server: {
    port: 1234,
    open: true,
  },
  build: {
    outDir,
    emptyOutDir: true,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      input: {
        [entries[0]]: resolve(root, `index.html`),
        [entries[1]]: resolve(root, `${entries[1]}/index.html`),
        [entries[2]]: resolve(root, `${entries[2]}/index.html`),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/s?css/i.test(extType)) {
            extType = "css";
            return `assets/${extType}/bundle_[hash].css`;
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
            return `assets/${extType}/[name][extname]`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        entryFileNames: () => {
          return `assets/js/bundle_[name].js`;
        },
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, "common/components"),
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
});
