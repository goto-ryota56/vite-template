import { resolve } from "path";
import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";
import { glob } from "glob";
import handlebars from "vite-plugin-handlebars";
const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
let entries = [];
let input = {};

const getHtml = glob.sync("./src/**/*.html", {
  ignore: ["src/common/components/*.html"],
});

getHtml.forEach((ent) => {
  let indexDelete = ent.replace("\\*.html", "");
  let srcDelete = indexDelete.replace("src", "");
  if (srcDelete !== "") {
    srcDelete = srcDelete.replace("\\", "");
  }
  entries.push(srcDelete);
});
for (let entry of entries) {
  const rep = entry.replace(".html", "");
  console.log(entry);
  input[`${rep}`] = resolve(root, `${entry}`);
}
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
      input,
      output: {
        entryFileNames: () => {
          return `assets/js/[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
            return `assets/${extType}/[name][extname]`;
          } else if (/s?css/i.test(extType)) {
            extType = "css";
            return `assets/${extType}/[hash].css`;
          } else {
            return `assets/${extType}/[name][extname]`;
          }
        },
        chunkFileNames: `assets/js/[hash].js`,
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
