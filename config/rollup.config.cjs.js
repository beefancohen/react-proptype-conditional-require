import config from '../rollup.config';

config.format = 'cjs';
config.dest = 'dist/react-proptype-conditional-require.js';
config.sourceMap = false;

export default config;
