import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false
});

export default merge(baseConfig, {
  // any <script type="module"> inside will be bundled by rollup
  input: './index.html',
  plugins: [json(), commonjs({ exclude: ['node_modules/socket.io-client/**'] })]
});
