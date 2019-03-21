import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: './main.ts',
  output: [
    {
      file: './bundle.js',
      format: 'iife'
    }
  ],
  plugins: [
    nodeResolve(),
    typescript({
      clean: true,
      typescript: require('typescript'),
      tsconfig: './tsconfig.json'
    }),
  ]
};
