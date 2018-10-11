'use strict';

var requireDir = require('require-dir');
requireDir('./gulp/tasks', {recurse: true});

var gulp = require('gulp');

gulp.task('clean', [
  'clean:azure',
  'clean:app'
],  function () { });

gulp.task('build', function () {
  return gulp.start([
    'build:azure',
    'build:app'
  ]);
});

gulp.task('watch', function() {
   gulp.start([
     'watch:azure',
     'watch:app'
   ])
});

gulp.task('serve', ['build', 'watch'], function() {
    gulp.start([
        'serve:app'
    ]);
});
