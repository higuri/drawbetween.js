// utils.js

const {execSync} = require('child_process');

// pushd() / popd()
const cwd = process.cwd();
function pushd(path) {
  console.log('pushd: ' + path);
  process.chdir(path);
}
function popd() {
  console.log('popd: ' + cwd);
  process.chdir(cwd);
}

// exec()
function exec(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

module.exports = {
  pushd, popd, exec
}
