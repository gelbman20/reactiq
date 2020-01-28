const gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require('gulp-autoprefixer'),
  gulpif = require('gulp-if'),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create(),
  pug = require("gulp-pug"),
  clean = require("gulp-clean"),
  cleanCSS = require('gulp-clean-css');
  
const path = {
  styles : {
    src : "sources/scss/**/*.scss",
    dest : "dev/css/"
  },
  html: {
    src: "dev/**/*.html",
    dest: "docs/"
  },
  pug: {
    src: "sources/pug/pages/*.pug",
    srcChange: "sources/pug/**/*.pug",
    dest: "dev/"
  }
};

const config = {
  autoprefixer: true
};

function style() {
  return (
    gulp
      .src(path.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(sourcemaps.write("./maps"))
      .pipe(gulp.dest(path.styles.dest))
      .pipe(browserSync.stream())
  );
}

function pugTask() {
  return (
    gulp
      .src(path.pug.src)
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest(path.pug.dest))
      .pipe(browserSync.stream())
  );
}

function reload() {
  browserSync.reload();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dev'
    }
  });
  gulp.watch(path.pug.srcChange, pugTask);
  gulp.watch(path.styles.src, style);
  gulp.watch(path.html.src, reload)
}

function html() {
  return (
    gulp
      .src(path.pug.src)
      .pipe(pug())
      .pipe(gulp.dest('docs/'))
  );
}

function sassDoc() {
  return(
    gulp
      .src(path.styles.src)
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(gulpif(config.autoprefixer, autoprefixer()))
      .pipe(cleanCSS())
      .pipe(gulp.dest('docs/css'))
  );
}

function copy() {
  return(
    gulp
      .src('dev/images/**/*')
      .pipe(gulp.dest('docs/images/'))
  );
}

function cleanDir() {
  return (
    gulp
      .src('docs/')
      .pipe(clean())
  );
}

gulp.task('cleanDir', gulp.series(cleanDir));
gulp.task('build', gulp.series(cleanDir, html, sassDoc, copy));
gulp.task('watch', gulp.series(watch));
