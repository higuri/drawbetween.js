// clean.js

const fs = require('fs-extra');
const {exec} = require('./utils');
const {pushd, popd} = require('./utils');

// dist
fs.removeSync('./dist');

// test/module/cjs/
pushd('./test/module/cjs/');
if (fs.existsSync('./node_modules')) {
  exec('yarn clean');
  fs.removeSync('./node_modules/');
}
popd();

// test/module/esm/
pushd('./test/module/esm/');
if (fs.existsSync('./node_modules')) {
  exec('yarn clean');
  fs.removeSync('./node_modules');
}
popd();

// test/module/iife/
pushd('./test/module/iife/');
if (fs.existsSync('./node_modules')) {
  exec('yarn clean');
  fs.removeSync('./node_modules');
}
popd();
