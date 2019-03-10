// test.js

const {execSync} = require('./utils');
const {pushd, popd} = require('./utils');

execSync('npm run clean');
execSync('npm run build:modules');
execSync('npm run build:pack');

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
