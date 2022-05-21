import html from '@web/rollup-plugin-html';
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/index.html',
  output: {
    dir: 'dist/rollup',
  },
  plugins: [
    html({
      extractAssets: true,
    }),
    copy({
      targets: [
        { src: 'src/assets/*', dest: 'dist/rollup/assets' },
        { src: '../node_modules/material-icons/iconfont/*.woff*', dest: 'dist/rollup/assets' },
      ]
    })
  ],
};