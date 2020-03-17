// sample.js
// TODO:
// * watch & hot reloading

const {execSync} = require('./utils');

// build:src
execSync('npm run build');
// build:sample
execSync('npx browserify ./sample/main.js -o ./sample/bundle.js');
// start:sample
execSync('npx open-cli ./sample/index.html');
