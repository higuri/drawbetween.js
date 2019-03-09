// test.js

const {exec} = require('./utils');
const {pushd, popd} = require('./utils');

// clean & build
exec('yarn clean');
exec('yarn build:modules');

// test/module/cjs/
pushd('./test/module/cjs/');
exec('yarn install', { stdio: 'inherit' });
exec('yarn build');
exec('yarn start');
popd();
// test/module/esm/
pushd('./test/module/esm/');
exec('yarn install');
exec('yarn build');
exec('yarn start');
popd();
// test/module/iife/
pushd('./test/module/iife/');
exec('yarn install');
exec('yarn build');
exec('yarn start');
