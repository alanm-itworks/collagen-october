'use strict';

var gulp = require('gulp');
var del = require('del');

var html = function(config) {
    var self = {};

    self.clean = function(cb) {
        return del(config.dist.html, cb);
    };

    self.build = function() {
        return gulp.src(config.source.html)
          .pipe(gulp.dest(config.dist.html));
    };

    self.cleanBuild = function() {
        self.clean();
        self.build();
    };
    
    self.watch = function() {
        gulp.watch(config.watch.html, self.build);
    };

    return self;
};

module.exports = html;

