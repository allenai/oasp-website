'use strict';

const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync');
const deployToGithubPages = require('gulp-gh-pages');
const sass = require('gulp-sass');

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

gulp.task('deploy', ['cname', 'html', 'sass', 'assets'], () => {
  const DEPLOY_OPTS = { remoteUrl: "https://github.com/allenai/oasp-website.git" };

  return gulp.src(`${BUILD_DIR}/**/*`)
    .pipe(deployToGithubPages(DEPLOY_OPTS));
});

gulp.task('dev', () => {
  browserSync({ server: { baseDir: BUILD_DIR }});
  return gulp.watch('src/**/*', ['html', 'sass', 'assets']);
});

gulp.task('default', ['dev']);
