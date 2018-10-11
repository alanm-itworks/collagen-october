'use strict';

var del = require('del');
var gulp = require('gulp');
var config = require('./config.js');

gulp.task('clean:azure', function(cb) {
  return del(config.dist.globals + 'startup.cs', cb);
});

gulp.task('build:azure-webconfig', function() {
  return gulp.src(config.source.webconfig)
    .pipe(gulp.dest(config.dist.webconfig));
});

gulp.task('build:azure-globals', function() {
  return gulp.src(config.source.globals)
    .pipe(gulp.dest(config.dist.globals));
});

gulp.task('build:azure-configs', function() {
  return gulp.src(config.source.configs)
    .pipe(gulp.dest(config.dist.configs));
});

gulp.task('build:azure', function() {
  return gulp.start([
    'build:azure-webconfig',
    'build:azure-globals',
    'build:azure-configs'
  ]);
});

gulp.task('watch:azure', function() {
  gulp.watch([config.source.globals], ['build:azure-globals', 'build:azure-webconfig', 'build:azure-configs']);
});