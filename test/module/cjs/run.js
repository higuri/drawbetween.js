// cjs/run.js
const browserify = require('browserify');
const fs = require('fs');
const opn = require('opn');

const bs = browserify();
bs.add(__dirname + '/main.js');
const reader = bs.bundle();
const writer = fs.createWriteStream(__dirname + '/bundle.js');
// XXX: imcomplete solution...
let finished = false;
reader.on('end', () => {
  finished = true;
  opn(__dirname + '/index.html');
});
reader.pipe(writer);
const timer = setInterval(() => {
  if (finished) {
    clearInterval(timer);
  }
}, 100);
