'use strict';

var gulp = require('gulp');
var del = require('del');

var images = function(config) {
    var self = {};

    self.clean = function(cb) {
        return del(config.dist.images, cb);
    };

    self.build = function() {
        return gulp.src(config.source.images)
          .pipe(gulp.dest(config.dist.images));
    };

    self.cleanBuild = function() {
        self.clean();
        self.build();
    };
    
    self.watch = function() {
        gulp.watch(config.watch.images, self.build);
    };

    return self;
};

module.exports = images;
