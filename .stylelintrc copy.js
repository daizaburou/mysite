gulp-clean-css'use strict';
const path = require('path');
const gulp = require('gulp');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const csvSync = require('csv-parse/lib/sync');
const stringify = require('json-stable-stringify');
const pug = require('gulp-pug');
const CacheBuster = require('gulp-cachebust');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleanCss = require('gulp-clean-css');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const packageImporter = require('node-sass-package-importer');
const glob = require('glob');

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

const cachebust = new CacheBuster({
  pathFormatter: function (dirname, basename, extname, checksum) {
    return path.join(dirname, basename + extname + '?' + checksum);
  },
});
cachebust.mappings = require(`${config.srcDir}/${config.src.html}/_data/config/cachebustMappings.json`);

class Utility {
  static writeFileSync(filepath, contents, callback) {
    mkdirp.sync(path.dirname(filepath));
    fs.writeFileSync(filepath, contents, callback);
  }
}

// CSV→JSON
function exportJson(done) {
  const dirName = 'lang';
  fs.readdirSync(__dirname + `/src/${dirName}/`).forEach((filename) => {
    const data = csvSync(fs.readFileSync(__dirname + `/src/${dirName}/${filename}`));
    const fileBaseName = path.basename(filename, '.csv');
    const json = {};

    const objName = {
      area: '',
      prop: '',
    };

    const firstRow = data[0];

    for (let col = 2; col < firstRow.length; col++) {
      json[firstRow[col]] = {};
    }

    for (let row = 1; row < data.length; row++) {
      const thisArea = data[row][0];
      if (thisArea) objName.area = thisArea;
      objName.prop = data[row][1];
      for (let col = 2; col < data[row].length; col++) {
        if (!json[firstRow[col]][objName.area]) json[firstRow[col]][objName.area] = {};
        json[firstRow[col]][objName.area][objName.prop] = data[row][col].replace(/(\r)?\n/g, '<br>');
      }
    }
    // console.log('file:', filename);
    // console.log('json:', json);
    Utility.writeFileSync(`src/pug/_data/${dirName}/${fileBaseName}.json`, stringify(json, { space: '  ' }));
  });
  done();
}

// HTML
function buildPug(done) {
  const languages = require('./src/pug/_data/languages');
  const pages = require('./src/pug/_data/pages');

  for (const template in pages) {
    const templateDir = path.dirname(template);
    for (const destPath of pages[template]) {
      gulp
        .src(`${config.srcDir}/${config.src.html}/_templates/${template}`)
        .pipe(plumber())
        .pipe(
          pug({
            pretty: 2,
            locals: {
              fs: fs,
              langId: destPath.lang === 'others' ? languages.default.lang : destPath.lang,
              destPath: destPath,
              langList: languages.langList,
              thisPageLanguages: pages[template],
              defaultLang: languages.default,
            },
          })
        )
        .pipe(cachebust.references())
        .pipe(gulp.dest(`${config.destDir}/${destPath.area}/${destPath.lang}/${templateDir}`));
    }
  }
  gulp
    .src([`${config.srcDir}/${config.src.html}/[^_]**/[^_]*.pug`, `${config.srcDir}/${config.src.html}/[^_]*.pug`])
    .pipe(plumber())
    .pipe(
      pug({
        pretty: 2,
        locals: {
          fs: fs,
          langId: languages.default.lang,
          thisPageLanguages: languages.langList,
          langList: languages.langList,
        },
      })
    )
    .pipe(cachebust.references())
    .pipe(gulp.dest(`${config.destDir}/${config.dest.html}`));
  done();
}

// CSS
function buildScss() {
  return gulp
    .src(`${config.srcDir}/${config.src.css}/*.scss`)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        importer: packageImporter({
          extensions: ['.scss', '.css'],
        }),
        outputStyle: 'expanded',
      })
    )
    .pipe(postcss([mqpacker(), autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest(`${config.destDir}/${config.dest.css}`));
}

// JS
function buildJs() {
  const entries = glob.sync('*.js', { cwd: `${config.srcDir}/${config.src.js}` }).map(function (key) {
    return [key, path.resolve(`${config.srcDir}/${config.src.js}`, key)];
  });
  const entryObj = Object.fromEntries(entries);
  return webpackStream(
    {
      mode: 'production',
      entry: entryObj,
      output: {
        filename: '[name]',
      },
      plugins: [
        new webpack.ProvidePlugin({
          Promise: 'es6-promise',
        }),
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
        ],
      },
    },
    webpack
  ).pipe(gulp.dest(`${config.destDir}/${config.dest.js}`));
}

function getHash() {
  return gulp
    .src([`${config.destDir}/${config.dest.css}/*`, `${config.destDir}/${config.dest.js}/*`], {
      base: `${config.destDir}`,
    })
    .pipe(cachebust.resources());
}
function saveHash(done) {
  console.log(cachebust.mappings);
  fs.writeFileSync(
    `${config.srcDir}/${config.src.html}/_data/config/cachebustMappings.json`,
    JSON.stringify(cachebust.mappings, null, '  ')
  );
  done();
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
  gulp.watch(`${config.srcDir}/${config.src.html}/**/*`, gulp.series(buildPug, reload));
  gulp.watch(`${config.srcDir}/${config.src.css}/**/*`, gulp.series(buildScss, reload));
  gulp.watch(`${config.srcDir}/${config.src.js}/**/*`, gulp.series(buildJs, reload));
  gulp.watch(`${config.srcDir}/${config.src.csv}/**/*`, gulp.series(exportJson, buildPug, reload));
}

exports['production'] = gulp.series(gulp.parallel(exportJson, buildScss, buildJs), getHash, saveHash, buildPug);
exports['build'] = gulp.parallel(gulp.series(exportJson, buildPug), buildScss, buildJs);
exports['build:pug'] = gulp.series(exportJson, buildPug);
exports['build:scss'] = buildScss;
exports['build:js'] = buildJs;
exports['watch'] = gulp.parallel(sync, watch);
