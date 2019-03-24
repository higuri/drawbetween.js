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

// takeScreenShot()
function takeScreenShot(nightmare, url, selector, imagePath) {
	return new Promise((resolve, reject) => {
		nightmare
			.goto(url)
			.wait(selector)
			.wait(500)
			.screenshot(imagePath)
      .then(() => {
        resolve(nightmare);
      });
	});
}

module.exports = {
  pushd, popd, execSync, takeScreenShot
}
