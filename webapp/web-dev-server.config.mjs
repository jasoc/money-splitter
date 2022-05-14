import { legacyPlugin } from '@web/dev-server-legacy';
import { chromeLauncher } from '@web/test-runner';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: { exportConditions: mode === 'dev' ? ['development'] : [] },
  preserveSymlinks: true,
  appIndex: 'dist/rollup/index.html',
  rootDir: 'dist/rollup',
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: false,
      },
    }),
  ],
  browsers: [chromeLauncher({ launchOptions: {
    args: ['--no-sandbox'],
  }})],
};
