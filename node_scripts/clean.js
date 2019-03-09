// clean.js

const rimraf = require('rimraf');
const rm = (v) => {
  rimraf(v, () => {});
};

rm('./dist');
rm('./test/module/cjs/bundle.js');
rm('./test/module/esm/bundle.js');
