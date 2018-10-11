'use strict';

var config = {
  remoteUrl: 'https://deviwg.com/collagenworks',
  production: false,
  source: {
    root: './app/src'
  },
  watch: {
    root: './app/src'
  },
  dist: {
    root: './app/dist'
  },
    port: 9000
};

// source files
config.source.css = config.source.root + '/scss/main.scss';
config.source.fonts = config.source.root + '/fonts/**/*';
config.source.html = config.source.root + '/index.html';
config.source.views = config.source.root + '/views/**/*.html';
config.source.images = config.source.root + '/img/**/*';
config.source.data = config.source.root + '/data/**/*';
config.source.webconfig = config.source.root + '/Web.config';
config.source.favicon = config.source.root + '/favicon.ico';
config.source.scripts = [
  config.source.root + '/js/main.js',
    '!' + config.source + '/js/templates.js'
];

// files to watch
config.watch.css = config.watch.root + '/scss/**/*.scss';
config.watch.fonts = config.watch.root + '/fonts/**/*.*';
config.watch.html = config.watch.root + '/*.html';
config.watch.images = config.watch.root + '/img/**/*.*';
config.watch.scripts = config.watch.root + '/js/**/*.*';
config.watch.data = config.watch.root + '/data/**/*.*';
config.watch.webconfig = config.watch.root + '/Web.config';
config.watch.favicon = config.watch.root + '/favicon.ico';

// distribution folders
config.dist.css = config.dist.root + '/assets/css';
config.dist.fonts = config.dist.root + '/assets/fonts';
config.dist.html = config.dist.root + '/';
config.dist.views = config.source.root + '/js/';
config.dist.images = config.dist.root + '/assets/img';
config.dist.scripts = config.dist.root + '/assets/js';
config.dist.serve = config.dist.root + '/index.html';
config.dist.data = config.dist.root + '/assets/data';
config.dist.webconfig = config.dist.root + '/';
config.dist.favicon = config.dist.root + '/';

module.exports = config;
