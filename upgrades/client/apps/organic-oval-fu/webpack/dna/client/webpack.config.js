var webpack = require('webpack')

module.exports = {
  'resolve': {
    'extensions': ['', '.webpack.js', '.web.js', '.tag', '.js'],
    'modulesDirectories': ['web_modules', 'node_modules', 'client/common']
  },
  'plugins': [
    new webpack.ProvidePlugin({
      'oval': 'organic-oval',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  'module': {
    'preLoaders': [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loaders: [
          'organic-oval/webpack/oval-loader',
          'organic-oval/webpack/oval-control-statements-loader'
        ]
      }
    ],
    'loaders': [
      {
        test: /\.js|.tag$/,
        include: /node_modules\/organic-oval/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.js$|\.tag$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['transform-react-jsx', { pragma: 'createElement' }]
          ],
          presets: ['es2015']
        }
      }
    ]
  }
}
