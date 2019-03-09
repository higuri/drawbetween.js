// test.js

const {execSync} = require('child_process');
const {pushd, popd} = require('./utils');

// clean & build
execSync('yarn clean');
execSync('yarn build');

// test/module/cjs/
pushd('./test/module/cjs/');
execSync('yarn build');
execSync('yarn start');
popd();
// test/module/esm/
pushd('./test/module/esm/');
execSync('yarn build');
execSync('yarn start');
popd();
// test/module/iife/
pushd('./test/module/iife/');
execSync('yarn build');
execSync('yarn start');
