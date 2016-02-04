import config from './rollup.config';

config.format = 'cjs';
config.dest = 'index.js';
config.sourceMap = false;

export default config;
