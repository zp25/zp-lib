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
      resolve({
        module: true,
        main: true,
      }),
      eslint(),
      babel({
        exclude: 'node_modules/**',
        externalHelpers: false,
      }),
    ],
    external: id => /@babel\/polyfill|core-js|whatwg-fetch/.test(id),
  },
];
