// cjs/run.js
const browserify = require('browserify');
const fs = require('fs');
const opn = require('opn');

browserify()
  .add(__dirname + '/main.js')
  .bundle()
  .pipe(fs.createWriteStream(__dirname + '/bundle.js'));
opn(__dirname + '/index.html');
