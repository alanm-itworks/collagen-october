'use strict';

var gulp = require('gulp');
var images = require('./../common/images');
var fonts = require('./../common/fonts');
var css = require('./../common/css');
var html = require('./../common/html');
var scripts = require('./../common/scripts');
var serve = require('./../common/serve');
var webconfig = require('./../common/webconfig');
var favicon = require('./../common/favicon');

var config = require('./config.js');

gulp.task('clean:app-images', images(config).clean);
gulp.task('build:app-images', images(config).build);
gulp.task('watch:app-images', images(config).watch);
gulp.task('clean-build:app-images', ['clean:app-images'], images(config).build);

gulp.task('clean:app-fonts', fonts(config).clean);
gulp.task('build:app-fonts', fonts(config).build);
gulp.task('watch:app-fonts', fonts(config).watch);
gulp.task('clean-build:app-fonts', ['clean:app-fonts'], fonts(config).build);

gulp.task('clean:app-css', css(config).clean);
gulp.task('build:app-css', css(config).build);
gulp.task('watch:app-css', css(config).watch);
gulp.task('clean-build:app-css', ['clean:app-css'], css(config).build);

gulp.task('clean:app-html', html(config).clean);
gulp.task('build:app-html', html(config).build);
gulp.task('watch:app-html', html(config).watch);
gulp.task('clean-build:app-html', ['clean:app-html'], html(config).build);

gulp.task('clean:app-scripts', scripts(config).clean);
gulp.task('build:app-scripts', scripts(config).build);
gulp.task('watch:app-scripts', scripts(config).watch);
gulp.task('clean-build:app-scripts', ['clean:app-scripts'], function() {
    return gulp.start(['build:app-scripts']);
});

gulp.task('clean:app-webconfig', webconfig(config).clean);
gulp.task('build:app-webconfig', webconfig(config).build);

gulp.task('clean:app-favicon', favicon(config).clean);
gulp.task('build:app-favicon', favicon(config).build);

gulp.task('clean:app', [], function() {
    return gulp.start([
        'clean:app-webconfig',
        'clean:app-favicon',
        'clean:app-images',
        'clean:app-fonts',
        'clean:app-css',
        'clean:app-data',
        'clean:app-scripts',
        'clean:app-html'
    ]);
});

gulp.task('build:app', function() {
    return gulp.start([
        'build:app-webconfig',
        'build:app-favicon',
        'build:app-images',
        'build:app-fonts',
        'build:app-css',
        'build:app-data',
        'build:app-scripts',
        'build:app-html'
    ]);
});

gulp.task('watch:app', [], function() {
    return gulp.start([
        'watch:app-images',
        'watch:app-fonts',
        'watch:app-css',
        'watch:app-data',
        'watch:app-scripts',
        'watch:app-html'
    ]);
});

gulp.task('serve:app', ['build:app', 'watch:app'], serve(config).open);
