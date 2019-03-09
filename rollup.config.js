import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/drawbetween.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.unpkg,
      format: 'iife',
      name: 'DrawBetween'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    // TODO: how to prevent from emitting MS Copyright?
    typescript({
      // use my typescript version.
      typescript: require('typescript'),
      clean: true
    }),
  ]
};
