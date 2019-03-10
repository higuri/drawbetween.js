// test.js

const {execSync} = require('./utils');
const {pushd, popd} = require('./utils');

execSync('yarn clean');
execSync('yarn build:modules');
execSync('yarn build:pack');

// test/module/cjs/
pushd('./test/module/cjs/');
execSync('yarn install', { stdio: 'inherit' });
execSync('yarn build');
execSync('yarn start');
popd();
// test/module/esm/
pushd('./test/module/esm/');
execSync('yarn install');
execSync('yarn build');
execSync('yarn start');
popd();
// test/module/iife/
pushd('./test/module/iife/');
execSync('yarn install');
execSync('yarn build');
execSync('yarn start');
