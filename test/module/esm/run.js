// esm/run.js
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const opn = require('opn');

(async function() {
  const bundle = await rollup.rollup({
    input: __dirname + '/main.ts',
    plugins: [
      typescript({
        typescript: require('typescript'),
        clean: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      })
    ]
  });
  await bundle.write({
    file: __dirname + '/bundle.js',
    format: 'iife'
  });
  opn(__dirname + '/index.html');
})();
