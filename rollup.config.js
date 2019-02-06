import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import {terser} from 'rollup-plugin-terser'
import {sizeSnapshot} from 'rollup-plugin-size-snapshot'
import pkg from './package.json'

const input = './src/index.js'

const name = 'cssVendor'

const external = id => !id.startsWith('.') && !id.startsWith('/')

const getBabelOptions = ({useESModules}) => ({
  exclude: /node_modules/,
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', {useESModules}]]
})

export default [
  {
    input,
    output: {file: `dist/${pkg.name}.js`, format: 'umd', name},
    plugins: [
      nodeResolve(),
      babel(getBabelOptions({useESModules: true})),
      replace({'process.env.NODE_ENV': JSON.stringify('development')}),
      sizeSnapshot()
    ]
  },

  {
    input,
    output: {file: `dist/${pkg.name}.min.js`, format: 'umd', name},
    plugins: [
      nodeResolve(),
      babel(getBabelOptions({useESModules: true})),
      replace({'process.env.NODE_ENV': JSON.stringify('production')}),
      sizeSnapshot(),
      terser()
    ]
  },

  {
    input,
    output: {file: pkg.main, format: 'cjs'},
    external,
    plugins: [babel(getBabelOptions({useESModules: false})), sizeSnapshot()]
  },

  {
    input,
    output: {file: pkg.module, format: 'esm'},
    external,
    plugins: [babel(getBabelOptions({useESModules: true})), sizeSnapshot()]
  }
]
