// clean.js

const fs = require('fs-extra');
const {execSync} = require('./utils');
const {pushd, popd} = require('./utils');

fs.removeSync('./dist');
fs.removeSync('./drawbetween.tgz');

// test/module/cjs/
pushd('./test/module/cjs/');
if (fs.existsSync('./node_modules')) {
  execSync('yarn clean');
  fs.removeSync('./yarn.lock');
  fs.removeSync('./node_modules/');
}
popd();

// test/module/esm/
pushd('./test/module/esm/');
if (fs.existsSync('./node_modules')) {
  execSync('yarn clean');
  fs.removeSync('./yarn.lock');
  fs.removeSync('./node_modules');
}
popd();

// test/module/iife/
pushd('./test/module/iife/');
if (fs.existsSync('./node_modules')) {
  execSync('yarn clean');
  fs.removeSync('./yarn.lock');
  fs.removeSync('./node_modules');
}
popd();
