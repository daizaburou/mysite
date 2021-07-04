'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');

//sass用
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleanCss = require('gulp-clean-css');

//ejs用
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');

//js用
// const path = require('path');
// const glob = require('glob');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const browserSync = require('browser-sync').create();

// const fs = require('fs-extra');
// const mkdirp = require('mkdirp');
// const stringify = require('json-stable-stringify');
// const packageImporter = require('node-sass-package-importer');

const config = {
  srcDir: './src',
  src: {
    html: 'ejs',
    css: 'scss',
    js: 'js',
  },
  destDir: './dist',
  dest: {
    html: '',
    css: 'assets/css',
    js: 'assets/js',
  },
  baseDir: './dist', // browser-syncのbaseDir
};

// EJS
function buildEjs(done) {
  gulp
    .src([`${config.srcDir}/${config.src.html}/**/*.ejs`, `!${config.srcDir}/${config.src.html}/**/_*.ejs`])
    .pipe(plumber())
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(`${config.destDir}/${config.dest.html}`));
  done();
}

// CSS
function buildScss() {
  return gulp
    .src(`${config.srcDir}/${config.src.css}/*.scss`)
    .pipe(sassGlob())
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([mqpacker(), autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest(`${config.destDir}/${config.dest.css}`));
}

// JS
function buildJs() {
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(`${config.destDir}/${config.dest.js}`));
}

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
  gulp.watch(`${config.srcDir}/${config.src.html}/**/*`, gulp.series(buildEjs, reload));
  gulp.watch(`${config.srcDir}/${config.src.css}/**/*`, gulp.series(buildScss, reload));
  //   gulp.watch(`${config.srcDir}/${config.src.js}/**/*`, gulp.series(buildJs, reload));
}

exports['build'] = gulp.parallel(buildEjs, buildScss /* buildJs*/);
exports['build:ejs'] = buildEjs;
exports['build:scss'] = buildScss;
exports['build:js'] = buildJs;
exports['watch'] = gulp.parallel(sync, watch);
