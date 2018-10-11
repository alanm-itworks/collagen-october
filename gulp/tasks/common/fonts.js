'use strict';

var gulp = require('gulp');
var del = require('del');

var fonts = function(config) {
    var self = {};

    self.clean = function(cb) {
        return del(config.dist.fonts, cb);
    };

    self.build = function() {
        return gulp.src(config.source.fonts)
          .pipe(gulp.dest(config.dist.fonts));
    };

    self.cleanBuild = function() {
        self.clean();
        self.build();
    };
    
    self.watch = function() {
        gulp.watch(config.watch.fonts, self.build);
    };

    return self;
};

module.exports = fonts;
