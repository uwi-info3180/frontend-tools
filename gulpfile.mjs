import {
  src,
  dest,
  series,
  watch,
}  from 'gulp';
import babel  from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import eslint  from 'gulp-eslint';
import imagemin, { mozjpeg } from 'gulp-imagemin';
import connect from 'gulp-connect';
import ts from 'gulp-typescript';

const sass = gulpSass(dartSass);

function startDevServer() {
  connect.server({
    root: 'build',
    livereload: true,
  });
}

function jsBuild() {
  return src('src/js/*.js')
    .pipe(babel())
    .pipe(dest('build/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('build/'))
    .pipe(connect.reload());
}

function scss() {
  return src('src/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    // .pipe(sass.sync({ style: 'compressed' }).on('error', sass.logError))
    .pipe(dest('build/css'))
    .pipe(connect.reload());
}

function optimize() {
  return src('src/images/*', { encoding: false })
    .pipe(imagemin([
      mozjpeg({ quality: 75, progressive: true }),
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

function copyHtmlFile() {
  return src('src/**/*.html')
    .pipe(dest('build'))
    .pipe(connect.reload());
}

function compileTS() {
  return src('src/**/*.ts')
    .pipe(ts({
      outFile: 'typescript-test.js',
    }))
    .pipe(dest('build'));
}

export { optimize as optimizeImages };
export { lint as lint };
export { scss as scss};
export { jsBuild as jsBuild};
export { copyHtmlFile as copyHtmlFile };
export { compileTS as compileTS };
export { startDevServer as startDevServer };
