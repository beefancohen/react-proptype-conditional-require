import babel from 'rollup-plugin-babel';

export default {
  entry: 'isRequiredIf.js',
  external: [ 'react' ],
  sourceMap: true,
  plugins: [  babel({
    exclude: 'node_modules/**'
  }) ]
};
