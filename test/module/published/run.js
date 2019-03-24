// published/run.js

const fs = require('fs-extra');
const path = require('path');
const resemble = require('node-resemble-js');
const {execSync} = require('../../../npm_scripts/utils');
const {pushd, popd} = require('../../../npm_scripts/utils');
const {takeScreenShot} = require('../../../npm_scripts/utils');
const Nightmare = require('nightmare');
const nightmare = Nightmare({
	show: true,
	width: 1024,
	height: 768,
	enableLargerThanScreen: true
});

const cjs = path.join(__dirname, 'cjs');
const esm = path.join(__dirname, 'esm');
const iife = path.join(__dirname, 'iife');

// build:
// - cjs
pushd(cjs);
execSync('npm install');
execSync('npm list drawbetween'); // show version
execSync('npm run build');
popd();
// - esm
pushd(esm);
execSync('npm install');
execSync('npm list drawbetween'); // show version
execSync('npm run build');
popd();
// - iife
pushd(iife);
execSync('npm install');
execSync('npm list drawbetween'); // show version
execSync('npm run build');

// run-test:
const cjsUrl = 'file://' + path.join(cjs, 'index.html');
const esmUrl = 'file://' + path.join(esm, 'index.html');
const iifeUrl ='file://' + path.join(iife, 'index.html');
const refImage = path.join(__dirname, 'reference', 'screen-shot-01.png');
const cjsImage = path.join(__dirname, 'cjs.png');
const esmImage = path.join(__dirname, 'esm.png');
const iifeImage = path.join(__dirname, 'iife.png');

async function takeScreenShots() {
  console.log('open: ' + cjsUrl);
  await takeScreenShot(nightmare, cjsUrl, '#canvas', cjsImage);
  console.log('open: ' + esmUrl);
  await takeScreenShot(nightmare, esmUrl, '#canvas', esmImage);
  console.log('open: ' + iifeUrl);
  await takeScreenShot(nightmare, iifeUrl, '#canvas', iifeImage);
  await nightmare.end();
}

async function compareScreenShots() {
  resemble.outputSettings({transparency: 0.1});
  const ref = Buffer(fs.readFileSync(refImage));
  for (let imgPath of [cjsImage, esmImage, iifeImage]) {
    const target = Buffer(fs.readFileSync(imgPath));
    resemble(ref).compareTo(target).onComplete(data => {
      if (0 < data.misMatchPercentage) {
        // TODO: name 'diff-cjs.png'
        const diffPath = path.join(__dirname, 'diff.png');
        console.log(`NG: see "${diffPath}"`);
        data.getDiffImage().pack().pipe(
          fs.createWriteStream(diffPath));
      } else {
        console.log(`OK: ${imgPath}`);
        fs.removeSync(imgPath);
      }
    });
  }
}

(async function runTest() {
  await takeScreenShots();
  await compareScreenShots();
})();
