const { src, dest, series, watch } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');

function jsBuild() {
  return src('src/js/*.js')
    .pipe(babel())
    .pipe(dest('build/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('build/'));
}

function scss() {
  return src('src/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(dest('build/css'));
}

function optimize() {
  return src('src/images/*')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
    ]))
    .pipe(dest('build/images'));
}

function lint() {
  return src('src/js/*.js')
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
}

exports.optimizeImages = optimize;
exports.lint = lint;
exports.scss = scss;
exports.jsBuild = jsBuild;
exports.default = () => {
  watch('src/js/*.js', series(lint, jsBuild));
  watch('src/scss/*.scss', scss);
};
