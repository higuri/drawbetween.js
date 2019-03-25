// published/run.js

const Nightmare = require('nightmare');
const path = require('path');
const {build, runTest} = require('../runlib.js');

const nightmare = Nightmare({
	show: true,
	width: 1024,
	height: 768,
	enableLargerThanScreen: true
});

const cjs = path.join(__dirname, 'cjs');
const esm = path.join(__dirname, 'esm');
const iife = path.join(__dirname, 'iife');

(async () => {
  for (let dirPath of [cjs, esm, iife]) {
    build(dirPath);
    const isSuccess = await runTest(dirPath, nightmare);
    if (!isSuccess) {
      break;
    }
  }
  await nightmare.end();
})();
