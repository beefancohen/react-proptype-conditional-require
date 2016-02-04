import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/react-proptype-conditional-require.umd.js';
config.moduleName = 'reactProptypeConditionalRequire';

export default config;
