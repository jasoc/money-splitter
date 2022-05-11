import { nodeResolve } from '@rollup/plugin-node-resolve';
import { html } from '@web/rollup-plugin-html';

export default {
    input: 'src/index.html',
    output: {
        dir: 'dist',
    },
    // output: {
    //     format: 'iife',
    // },
    plugins: [
        nodeResolve(),
        html(),
    ],
};