// clean.js

const fs = require('fs-extra');
const {execSync} = require('./utils');
const {pushd, popd} = require('./utils');

fs.removeSync('./dist');
fs.removeSync('./drawbetween.tgz');

// test/module/
pushd('./test/module/');
fs.removeSync('screen-shot.png');
popd();

// test/module/local/cjs/
pushd('./test/module/local/cjs/');
if (fs.existsSync('./node_modules')) {
  execSync('npm run clean');
  fs.removeSync('./package-lock.json');
  fs.removeSync('./node_modules/');
}
popd();

// test/module/local/esm/
pushd('./test/module/local/esm/');
if (fs.existsSync('./node_modules')) {
  execSync('npm run clean');
  fs.removeSync('./package-lock.json');
  fs.removeSync('./node_modules');
}
popd();

// test/module/local/iife/
pushd('./test/module/local/iife/');
if (fs.existsSync('./node_modules')) {
  execSync('npm run clean');
  fs.removeSync('./package-lock.json');
  fs.removeSync('./node_modules');
}
popd();

// test/module/published/cjs/
pushd('./test/module/published/cjs/');
if (fs.existsSync('./node_modules')) {
  execSync('npm run clean');
  fs.removeSync('./package-lock.json');
  fs.removeSync('./node_modules/');
}
popd();

// test/module/published/esm/
pushd('./test/module/published/esm/');
if (fs.existsSync('./node_modules')) {
  execSync('npm run clean');
  fs.removeSync('./package-lock.json');
  fs.removeSync('./node_modules');
}
popd();

// test/module/published/iife/
pushd('./test/module/published/iife/');
if (fs.existsSync('./node_modules')) {
  execSync('npm run clean');
  fs.removeSync('./package-lock.json');
  fs.removeSync('./node_modules');
}
popd();
