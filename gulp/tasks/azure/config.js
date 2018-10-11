'use strict';

var config = {
  source: {
    root: './src'
  },
  watch: {
    root: './src'
  },
  dist: {
    root: './dist'
  }
};

// source files
config.source.globals = config.source.root + '/Global.asax';
config.source.webconfig = config.source.root + '/Web.config';
config.source.configs = [
  config.source.root + '/**/config.json'
];

// files to watch
config.watch.globals = config.watch.root + '/Global.asax';
config.watch.webconfig = config.watch.root + '/Web.config';
config.watch.configs = [
  config.watch.root + '/**/config.json'
];

// distribution folders
config.dist.globals = config.dist.root + '/';
config.dist.webconfig = config.dist.root + '/';
config.dist.configs = config.dist.root + '/';

module.exports = config;


