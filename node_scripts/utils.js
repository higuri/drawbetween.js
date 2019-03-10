// utils.js

const child_process = require('child_process');

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

// execSync()
function execSync(cmd) {
  child_process.execSync(cmd, { stdio: 'inherit' });
}

module.exports = {
  pushd, popd, execSync
}
