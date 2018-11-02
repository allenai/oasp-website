'use strict';

const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const deployToGithubPages = require('./deploy');

const BUILD_DIR = 'build';

gulp.task('html', () => {
  return (
    gulp
      .src('src/**/*.html')
      .pipe(gulp.dest(BUILD_DIR))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task('sass', () => {
  return gulp.src('src/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIR))
});

gulp.task('assets', function() {
  return gulp.src('src/assets/**')
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('cname', () => {
  return (
    gulp
      .src('src/CNAME')
      .pipe(gulp.dest(BUILD_DIR))
  );
});

gulp.task('build', ['cname', 'html', 'sass', 'assets']);

gulp.task('deploy', ['build'], () => {
  deployToGithubPages(BUILD_DIR);
});

gulp.task('dev', () => {
  browserSync({ server: { baseDir: BUILD_DIR }});
  return gulp.watch('src/**/*', ['html', 'sass', 'assets']);
});

gulp.task('default', ['dev']);
