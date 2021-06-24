'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

// const path = require('path');
// const gulp = require('gulp');
// const fs = require('fs-extra');
// const mkdirp = require('mkdirp');
// const csvSync = require('csv-parse/lib/sync');
// const stringify = require('json-stable-stringify');
// const pug = require('gulp-pug');
// const CacheBuster = require('gulp-cachebust');
// const sass = require('gulp-sass');
// const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleanCss = require('gulp-clean-css');
// const webpackStream = require('webpack-stream');
// const webpack = require('webpack');
// const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
// const packageImporter = require('node-sass-package-importer');
// const glob = require('glob');


const config = {
  srcDir: './src',
  src: {
    html: 'pug',
    css: 'scss',
    js: 'js',
    csv: 'lang',
  },
  destDir: './dist',
  dest: {
    html: '',
    css: 'assets/css',
    js: 'assets/js',
  },
  baseDir: './dist', // browser-syncのbaseDir
};

// CSS
function buildScss() {
  return gulp
    .src(`${config.srcDir}/${config.src.css}/*.scss`)
    .pipe(sassGlob())
    // .pipe(plumber())
    .pipe(
      sass({outputStyle: 'expanded'})
    )
    .pipe(postcss([mqpacker(), autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest(`${config.destDir}/${config.dest.css}`));
}

// // JS
// function buildJs() {
//   const entries = glob.sync('*.js', { cwd: `${config.srcDir}/${config.src.js}` }).map(function (key) {
//     return [key, path.resolve(`${config.srcDir}/${config.src.js}`, key)];
//   });
//   const entryObj = Object.fromEntries(entries);
//   return webpackStream(
//     {
//       mode: 'production',
//       entry: entryObj,
//       output: {
//         filename: '[name]',
//       },
//       plugins: [
//         new webpack.ProvidePlugin({
//           Promise: 'es6-promise',
//         }),
//       ],
//       module: {
//         rules: [
//           {
//             test: /\.js$/,
//             exclude: /node_modules/,
//             use: {
//               loader: 'babel-loader',
//             },
//           },
//         ],
//       },
//     },
//     webpack
//   ).pipe(gulp.dest(`${config.destDir}/${config.dest.js}`));
// }

// function getHash() {
//   return gulp
//     .src([`${config.destDir}/${config.dest.css}/*`, `${config.destDir}/${config.dest.js}/*`], {
//       base: `${config.destDir}`,
//     })
// }

// ホットリロード
function sync() {
  browserSync.init({
    server: config.baseDir,
  });
}
function reload(done) {
  browserSync.reload();
  done();
}
function watch() {
//   gulp.watch(`${config.srcDir}/${config.src.html}/**/*`, gulp.series(buildPug, reload));
  gulp.watch(`${config.srcDir}/${config.src.css}/**/*`, gulp.series(buildScss, reload));
//   gulp.watch(`${config.srcDir}/${config.src.js}/**/*`, gulp.series(buildJs, reload));
//   gulp.watch(`${config.srcDir}/${config.src.csv}/**/*`, gulp.series(exportJson, buildPug, reload));
}

// exports['production'] = gulp.series(gulp.parallel(exportJson, buildScss, buildJs), getHash, saveHash, buildPug);
// exports['build'] = gulp.parallel(gulp.series(exportJson, buildPug), buildScss, buildJs);
// exports['build:pug'] = gulp.series(exportJson, buildPug);
exports['build:scss'] = buildScss;
// exports['build:js'] = buildJs;
exports['watch'] = gulp.parallel(sync, watch);
