'use strict';

var gulp = require('gulp');
var del = require('del');

var webconfig = function(config) {
    var self = {};

    self.clean = function(cb) {
        return del(config.dist.webconfig, cb);
    };

    self.build = function() {
        return gulp.src(config.source.webconfig)
        .pipe(gulp.dest(config.dist.webconfig));
    };

    self.cleanBuild = function() {
        self.clean();
        self.build();
    };
    
    return self;
};

module.exports = webconfig;

