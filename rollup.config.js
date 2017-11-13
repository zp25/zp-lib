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
      resolve(),
      eslint(),
      babel({
        exclude: 'node_modules/**',
        // externalHelpers: true,
      }),
    ],
    external: id => /@babel\/polyfill|whatwg-fetch/.test(id),
  },
];
