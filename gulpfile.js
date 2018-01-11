'use strict';

// База
var gulp = require('gulp');
var rename = require('gulp-rename');
var del = require('del');
var run = require('run-sequence');
var pump = require('pump');

// Post-css и его плагины
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// Post-html и его плагины
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');

// Оптимизация кода
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-csso');
var uglify = require('gulp-uglify');
var svgstore = require('gulp-svgstore');
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');

// Оптимизация изображений
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');

// Сервер
var server = require('browser-sync').create();

var cheerio = require('gulp-cheerio');


// Копирует все нужные файлы в билд кроме css и html (этим занимаются отдельные таски)
gulp.task('copy', function () {
  return gulp.src([
    'fonts/**.{woff,woff2}',
    'img/**',
    'js/**'
  ], {
    base: '.'
  })
    .pipe(gulp.dest('build'));
});


// Сборка, минификация, удаление неиспользуемых стилей для продакшена
gulp.task('style', function() {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(uncss({
      html: ['index.html', 'posts/**/*.html', '*.html', 'http://example.com']
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
});


// Минификация html для продакшена
gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});


// Минификация js для продакшена
// gulp.task('uglify', function (cd) {
//   pump([gulp.src('js/*.js'),
//     uglify(),
//     gulp.dest('build/js')], cd)
// });


// Минификация и конкатенация js для продакшена
gulp.task('js-optimization', function (cd) {
  pump([gulp.src('js/*.js'),
    uglify(),
    // concat('all.js'),
    gulp.dest('build/js')], cd)
});


// Готовим svg-спрайт
gulp.task('sprite', function () {
  return gulp.src('img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
});


// Оптимизация и минификация изображений (png, jpg, svg)
gulp.task('images', function () {
  return gulp.src('img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});


// Создание и оптимизация изображений webp
gulp.task('webp', function () {
  return gulp.src('img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
});


// Очистка папки билд
gulp.task('clean', function () {
  return del('build');
});


// Запус сервера продакшена
gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html', ['html'])
    .on('change', server.reload);
  gulp.watch('js/**/*.js')
    .on('change', server.reload);
});


// Создание папки билд
gulp.task('build', function (done) {
  run(
    'clean',
    'style',
    // 'uglify',
    'js-optimization',
    'sprite',
    'webp',
    'html',
    'copy',
    done
  );
});
