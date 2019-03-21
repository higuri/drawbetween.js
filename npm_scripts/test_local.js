// test_local.js

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

// test/module/local/cjs/
pushd('./test/module/local/cjs/');
// CAUTION: Don't use `yarn install` here. Use `npm install`.
// https://github.com/yarnpkg/yarn/issues/2165
execSync('npm install');
execSync('npm run build');
execSync('npm run start');
popd();
// test/module/local/esm/
pushd('./test/module/local/esm/');
execSync('npm install');
execSync('npm run build');
execSync('npm run start');
popd();
// test/module/local/iife/
pushd('./test/module/local/iife/');
execSync('npm install');
execSync('npm run build');
execSync('npm run start');
