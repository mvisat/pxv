const process = require('process');
const fs = require('fs');
const { watch, series, src, dest } = require('gulp');
const mergeStream = require('merge-stream');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const browserSync = require('browser-sync').create();

const prod = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const baseUrl = prod ? 'https://pxv.visat.me/' : `http://localhost:${port}/`;

function clean(cb) {
  return fs.rm('public', { recursive: true, force: true }, cb);
}

function processAssets() {
  const js = src('src/assets/js/**/*', {base: 'src'}).pipe(uglify());
  const css = src('src/assets/css/**/*', {base: 'src'}).pipe(postcss());
  const img = src('src/assets/img/**/*', {base: 'src'});
  return mergeStream(js, css, img)
    .pipe(rev())
    .pipe(dest('public'))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {
      base: 'public/assets',
      merge: true,
    }))
    .pipe(dest('public/assets'))
    .pipe(browserSync.stream());
}

function processHTML() {
  let ret = src('src/**/*.html', {base: 'src'});
  try {
    const manifest = fs.readFileSync('public/assets/rev-manifest.json');
    ret = ret.pipe(revRewrite({
      manifest,
      prefix: baseUrl,
    }));
  } catch (err) {
    if (err.code !== 'NOENT') {
      throw err;
    }
  }
  if (prod) {
    ret = ret.pipe(htmlmin({ collapseWhitespace: true }));
  }
  return ret
    .pipe(dest('public'))
    .pipe(browserSync.stream());
}

function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: 'public',
    },
    port,
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  watch('src/**/*', series(clean, processAssets, processHTML, browserSyncReload));
  watch('*.js', series(processAssets, processHTML, browserSyncReload));
}

exports.default = series(processAssets, processHTML, browserSyncServe, watchTask);
exports.build = series(clean, processAssets, processHTML);
exports.clean = series(clean);
