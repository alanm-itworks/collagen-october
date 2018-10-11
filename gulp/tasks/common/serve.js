'use strict';

var gulp = require('gulp');
var express = require('express');
var open = require('gulp-open');

var app = express();

var serve = function(config) {
    var self = {};

    self.static = function() {
        app.use(express.static(config.dist.root));
        app.listen(config.port);
    };

    self.open = function() {
        self.static();
        return gulp.src(config.dist.serve)
            .pipe(open({uri: 'http://localhost:' + config.port}));
    };

    return self;
};

module.exports = serve;
