// utils.js

// rm()
const rimraf = require('rimraf');
const rm = (v) => {
  rimraf(v, () => {});
};

// pushd() / popd()
const cwd = process.cwd();
const pushd = (v) => {
  console.log('pushd: ' + v);
  process.chdir(v);
};
const popd = () => {
  console.log('popd: ' + cwd);
  process.chdir(cwd);
};

module.exports = {
  rm, pushd, popd
}
