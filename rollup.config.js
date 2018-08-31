import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
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
      commonjs(),
    ],
    external: id => /whatwg-fetch/.test(id),
  },
];
