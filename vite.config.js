import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import handlebars from 'vite-plugin-handlebars';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  base: './',
  server: {
    port: 1234,
    open: true
  },
  build: {
    outDir,
    emptyOutDir: true,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        about: resolve(root, 'about/index.html')
      },
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
          return `assets/${extType}/[name][extname]`;
        },
        entryFileNames: `assets/js/bundle.js`
      }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, 'common/components')
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
});
