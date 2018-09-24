const gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  del = require('del'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require("gulp-notify");


gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task("images", function() {
  return gulp.src("app/img/**/*.{png,jpg,gif}")
    .pipe(gulp.dest("dist/img"));
});

gulp.task("fonts", function() {
  return gulp.src("app/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task('watch', ['sass', 'browser-sync'], function () {
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', ['removedist', 'sass', 'html', 'images', 'fonts'], function () {
  const buildCss = gulp.src([
    'app/css/main.min.css'
  ]).pipe(gulp.dest('dist/css'));
});

gulp.task('removedist', function () {
  return del.sync('dist');
});
gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
