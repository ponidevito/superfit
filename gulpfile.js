"use strict";

// ─── wPath ────────────────────────────────────────────────────────────────────
const projectFolder = "build";
const sourceFolder = "src";

const path = {
  build: {
    html: `${projectFolder}/`,
    css: `${projectFolder}/css/`,
    js: `${projectFolder}/js/`,
    img: `${projectFolder}/img/`,
    fonts: `${projectFolder}/fonts/`,
  },
  src: {
    html: [`${sourceFolder}/*.html`, `!${sourceFolder}/_*.html`],
    css: `${sourceFolder}/scss/style.scss`,
    js: `${sourceFolder}/js/scripts.js`,
    img: `${sourceFolder}/img/**/*.{png,jpg,jpeg,ico,svg,webp,gif}`,
    fonts: `${sourceFolder}/fonts/**/*.{woff,woff2,ttf,eot,svg}`,
  },
  watch: {
    html: `${sourceFolder}/**/*.html`,
    css: `${sourceFolder}/scss/**/*.scss`,
    js: `${sourceFolder}/js/**/*.js`,
    img: `${sourceFolder}/img/**/*.{png,jpg,jpeg,ico,svg,webp,gif}`,
    fonts: `${sourceFolder}/fonts/**/*.{woff,woff2,ttf,eot,svg}`,
  },
  clean: `./${projectFolder}/`,
};

// ─── Plugins ──────────────────────────────────────────────────────────────────
const { src, dest, watch, series, parallel } = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const del = require("del");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

// ─── helper ─────────────────────────────────────────────────
const onError = (taskName) =>
  plumber({
    errorHandler: notify.onError({
      title: `Gulp: помилка в ${taskName}`,
      message: "<%= error.message %>",
      sound: false,
    }),
  });

// ─── Browser Sync ─────────────────────────────────────────────────────────────
function browserSync() {
  browsersync.init({
    server: { baseDir: `./${projectFolder}/` },
    port: 3000,
    notify: false,
    open: true,
  });
}

// ─── HTML ─────────────────────────────────────────────────────────────────────
function html() {
  return src(path.src.html)
    .pipe(onError("html"))
    .pipe(fileinclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
function css() {
  return src(path.src.css)
    .pipe(onError("css"))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      autoprefixer({
        cascade: false,
        overrideBrowserslist: ["last 3 versions", "> 1%", "not dead"],
      }),
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCss({ level: 2 }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

// ─── JavaScript ───────────────────────────────────────────────────────────────
function js() {
  return src(path.src.js)
    .pipe(onError("js"))
    .pipe(sourcemaps.init())
    .pipe(fileinclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest(path.build.js))
    .pipe(
      terser({
        compress: { drop_console: false },
        format: { comments: false },
      }),
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.build.js)) // мінімізований + sourcemap
    .pipe(browsersync.stream());
}

// ─── Images  ────────────────────────────────────────
function images() {
  return src(path.src.img, { encoding: false })
    .pipe(onError("images"))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

// ─── Images ────────────────────────────────────────────────
function imgOptimize() {
  return src(path.src.img, { encoding: false })
    .pipe(onError("imgOptimize"))
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 80, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [
              { name: "removeViewBox", active: false },
              { name: "cleanupIDs", active: false },
            ],
          }),
        ],
        { verbose: true },
      ),
    )
    .pipe(dest(path.build.img));
}

// ─── Fonts ────────────────────────────────────────────────────────────────────
function fonts() {
  return src(path.src.fonts, { encoding: false })
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream());
}

// ─── Clean ───────────────────────────────────────────────────────────────────
function clean() {
  return del(path.clean);
}

// ─── Watch ───────────────────────────────────────────────────────────────────
function watchFiles() {
  watch(path.watch.html, html);
  watch(path.watch.css, css);
  watch(path.watch.js, js);
  watch(path.watch.img, images);
  watch(path.watch.fonts, fonts);
}

// ─── Експорт задач ───────────────────────────────────────────────────────────
const build = series(clean, parallel(html, css, js, images, fonts));
const buildProd = series(clean, parallel(html, css, js, imgOptimize, fonts));
const dev = parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.imgOptimize = imgOptimize;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.prod = buildProd;
exports.watch = dev;
exports.default = dev;
