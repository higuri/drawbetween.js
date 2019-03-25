// runlib.js

const fs = require('fs-extra');
const path = require('path');
const resemble = require('node-resemble-js');
const {execSync} = require('../../npm_scripts/utils');
const {pushd, popd} = require('../../npm_scripts/utils');
const {takeScreenShot} = require('../../npm_scripts/utils');

// refImage
const refImage = path.join(__dirname, 'reference', 'screen-shot-01.png');

// build()
function build(dirPath) {
  pushd(dirPath);
  execSync('npm install');
  execSync('npm list drawbetween'); // show version
  execSync('npm run build');
  popd();
}

// runTest()
async function runTest(dirPath, nightmare) {
  const image = path.join(__dirname, 'screen-shot.png');
  await start(dirPath, image, nightmare);
  const isMatched = await compare(image, refImage);
  if (isMatched) {
    console.log(`OK: ${dirPath}`);
    await fs.removeSync(image);
    return true;
  } else {
    console.log(`NG: ${dirPath}`);
    return false;
  }
}

// start()
async function start(dirPath, imagePath, nightmare) {
  // index.html
  const url = 'file://' + path.join(dirPath, 'index.html');
  console.log('open: ' + url);
  return await takeScreenShot(nightmare, url, '#canvas', imagePath);
}

// compare()
async function compare(image, refImage) {
  resemble.outputSettings({transparency: 0.1});
  const img = Buffer(fs.readFileSync(image));
  const refImg = Buffer(fs.readFileSync(refImage));
  return new Promise((resolve, reject) => {
    resemble(img).compareTo(refImg).onComplete(data => {
      if (0 < data.misMatchPercentage) {
        const diffPath = path.join(__dirname, 'diff.png');
        console.log(`Not Matched: see "${diffPath}"`);
        data.getDiffImage().pack().pipe(
          fs.createWriteStream(diffPath));
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = {
  build, runTest
}
