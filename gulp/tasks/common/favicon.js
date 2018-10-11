'use strict';

var gulp = require('gulp');
var del = require('del');

var favicon = function(config) {
    var self = {};

    self.clean = function(cb) {
        return del(config.dist.favicon, cb);
    };

    self.build = function() {
        return gulp.src(config.source.favicon)
        .pipe(gulp.dest(config.dist.favicon));
    };

    self.cleanBuild = function() {
        self.clean();
        self.build();
    };

    return self;
};

module.exports = favicon;
