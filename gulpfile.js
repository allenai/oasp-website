'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const deployToGithubPages = require('gulp-gh-pages');

const BUILD_DIR = 'build';

gulp.task('html', () => {
  return (
    gulp
      .src('src/**/*.html')
      .pipe(gulp.dest(BUILD_DIR))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task('deploy', ['html'], () => {
  return (
    gulp
      .src(`${BUILD_DIR}/**/*`)
      .pipe(deployToGithubPages())
  );
});

gulp.task('dev', () => {
  browserSync({ server: { baseDir: BUILD_DIR }});
  return gulp.watch('src/**/*', ['html']);
});

gulp.task('default', ['dev']);
