// clean.js

const fs = require('fs-extra');
const {execSync} = require('./utils');
const {pushd, popd} = require('./utils');

fs.removeSync('./dist');
fs.removeSync('./drawbetween.tgz');

// test/module/local/cjs/
pushd('./test/module/local/cjs/');
if (fs.existsSync('./node_modules')) {
  execSync('yarn clean');
  fs.removeSync('./yarn.lock');
  fs.removeSync('./node_modules/');
}
popd();

// test/module/local/esm/
pushd('./test/module/local/esm/');
if (fs.existsSync('./node_modules')) {
  execSync('yarn clean');
  fs.removeSync('./yarn.lock');
  fs.removeSync('./node_modules');
}
popd();

// test/module/local/iife/
pushd('./test/module/local/iife/');
if (fs.existsSync('./node_modules')) {
  execSync('yarn clean');
  fs.removeSync('./yarn.lock');
  fs.removeSync('./node_modules');
}
popd();
