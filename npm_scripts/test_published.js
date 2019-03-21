// test_published.js

const {execSync} = require('./utils');
const {pushd, popd} = require('./utils');

// test/module/published/cjs/
pushd('./test/module/published/cjs/');
execSync('npm install');
// show version.
execSync('npm list drawbetween');
execSync('npm run build');
execSync('npm run start');
popd();
// test/module/published/esm/
pushd('./test/module/published/esm/');
execSync('npm install');
// show version.
execSync('npm list drawbetween');
execSync('npm run build');
execSync('npm run start');
popd();
// test/module/published/iife/
pushd('./test/module/published/iife/');
execSync('npm install');
// show version.
execSync('npm list drawbetween');
execSync('npm run build');
execSync('npm run start');
