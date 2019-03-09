// clean.js

const {execSync} = require('child_process');
const {rm} = require('./utils');
const {pushd, popd} = require('./utils');

rm('./dist');
// cjs;
pushd('./test/module/cjs/');
execSync('yarn clean');
popd();
// esm;
pushd('./test/module/esm/');
execSync('yarn clean');
popd();
