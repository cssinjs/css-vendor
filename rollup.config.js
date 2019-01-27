import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import {terser} from 'rollup-plugin-terser'
import {sizeSnapshot} from 'rollup-plugin-size-snapshot'
import pkg from './package.json'

const input = './src/index.js'

const name = 'cssVendor'

const external = id => !id.startsWith('.') && !id.startsWith('/')

const babelOptions = {
  exclude: /node_modules/
}

const commonjsOptions = {
  include: /node_modules/
}

export default [
  {
    input,
    output: {file: `dist/${pkg.name}.js`, format: 'umd', name},
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      replace({'process.env.NODE_ENV': JSON.stringify('development')}),
      sizeSnapshot()
    ]
  },

  {
    input,
    output: {file: `dist/${pkg.name}.min.js`, format: 'umd', name},
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      replace({'process.env.NODE_ENV': JSON.stringify('production')}),
      sizeSnapshot(),
      terser()
    ]
  },

  {
    input,
    output: {file: pkg.main, format: 'cjs'},
    external,
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      sizeSnapshot()
    ]
  },

  {
    input,
    output: {file: pkg.module, format: 'esm'},
    external,
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      sizeSnapshot()
    ]
  },
]
