'use strict';

var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var rename = require('gulp-rename');

var css = function(config) {
    var self = {};

    self.clean = function(cb) {
        return del(config.dist.css, cb);
    };

    self.build = function() {
        return gulp.src(config.source.css)
            .pipe(sass({
                style: 'compressed',
                loadPath: './node_modules'
            }).on('error', notify.onError(function (err) {
                return 'CSS Error:' + err.message;
            }))).pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest(config.dist.css))
          .pipe(notify('CSS Success: <%= file.relative %>'));
    };

    self.cleanBuild = function() {
        self.clean();
        self.build();
    };
    
    self.watch = function() {
        return gulp.watch(config.watch.css, self.build);
    };

    return self;
};

module.exports = css;

