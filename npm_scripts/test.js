// test.js

const fs = require('fs');
const {execSync} = require('./utils');
const {pushd, popd} = require('./utils');
const version = require('../package.json').version;

// clean
execSync('npm run clean');
// build
execSync('npm run build');
// pack
execSync('npm pack');
fs.rename(`./drawbetween-${version}.tgz`, './drawbetween.tgz');

// test/module/cjs/
pushd('./test/module/cjs/');
// CAUTION: Don't use `yarn install` here. Use `npm install`.
// https://github.com/yarnpkg/yarn/issues/2165
execSync('npm install');
execSync('npm run build');
execSync('npm run start');
popd();
// test/module/esm/
pushd('./test/module/esm/');
execSync('npm install');
execSync('npm run build');
execSync('npm run start');
popd();
// test/module/iife/
pushd('./test/module/iife/');
execSync('npm install');
execSync('npm run build');
execSync('npm run start');
