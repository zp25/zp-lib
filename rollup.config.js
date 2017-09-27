import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import pkg from './package.json';

export default [
  {
    input: 'index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    sourcemap: true,
    plugins: [
      eslint(),
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
    external: id => /babel-polyfill/.test(id),
  },
];
