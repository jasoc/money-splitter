import { nodeResolve } from '@rollup/plugin-node-resolve';
import html from '@web/rollup-plugin-html';
import scss from 'rollup-plugin-scss';

export default {
    input: 'src/index.html',
    output: { dir: '../dist' },
    plugins: [
      nodeResolve(),
      html(),
      scss({
        include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
        output: "../dist/style.css",
        failOnError: true,
      }),
    ],
  };