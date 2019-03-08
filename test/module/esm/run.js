// esm/run.js
const fs = require('fs');
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const opn = require('opn');

(async function() {
  // XXX: copy dist/drawbetween.d.ts dist/drawbetween_esm.d.ts
  const bundle = await rollup.rollup({
    input: __dirname + '/main.ts',
    plugins: [
      typescript({
        clean: true,
        typescript: require('typescript'),
        tsconfig: __dirname + '/tsconfig.json'
      })
    ]
  });
  await bundle.write({
    file: __dirname + '/bundle.js',
    format: 'iife'
  });
  opn(__dirname + '/index.html');
})();
