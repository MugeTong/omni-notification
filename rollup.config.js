// this file is used to build the library with Rollup.
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'module',
  },
  plugins: [
    vue(),
    postcss(),
    resolve(),
    commonjs(),
    typescript(),
    terser(),
  ],
};
