import config from './rollup.config';

config.format = 'es6';
config.external = [ 'react' ];
config.dest = 'dist/react-proptype-conditional-require.js';

export default config;
