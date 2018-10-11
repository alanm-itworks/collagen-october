'use strict';

var gulp = require('gulp');
var del = require('del');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

var scripts = function (config) {
  var self = {};

  self.clean = function (cb) {
    return del(config.dist.scripts, cb);
  };

  self.build = function () {
    if (config.production) {
      return gulp.src(config.source.scripts)
        .pipe(browserify({
          insertGlobals: true
        }))
        .pipe(uglify({ mangle: false }))
        .pipe(rename('main7.min.js'))
        .pipe(gulp.dest(config.dist.scripts))
        .pipe(notify('JS Success: <%= file.relative %>'));
    } else {
      return gulp.src(config.source.scripts)
        .pipe(browserify({
          insertGlobals: true
        }))
        .pipe(rename('main7.min.js'))
        .pipe(gulp.dest(config.dist.scripts))
        .pipe(notify('JS Success: <%= file.relative %>'));
    }
  };

  self.cleanBuild = function () {
    self.clean();
    self.build();
  };

  self.watch = function () {
    gulp.watch(config.watch.scripts, self.build);
  };

  return self;
};

module.exports = scripts;
