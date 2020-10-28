// webpack.config.js

module.exports = {
    entry: './js/index.js',
    output: {
        filename: './bundle.js'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      }
};