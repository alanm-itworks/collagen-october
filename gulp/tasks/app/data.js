'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('./config');

gulp.task('clean:app-data', function(cb) {
  return del(config.dist.data, cb);
});

gulp.task('build:app-data', function() {
  return gulp.src(config.source.data)
    .pipe(gulp.dest(config.dist.data));
});

gulp.task('clean-build:app-data', ['clean:app-data'], function () {
  gulp.start(['build:app-data']);
});

gulp.task('watch:app-data', function() {
  gulp.watch(config.source.data, ['build:app-data']);
});
