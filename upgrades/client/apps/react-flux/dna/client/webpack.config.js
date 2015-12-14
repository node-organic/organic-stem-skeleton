module.exports = {
  "resolve": {
    "extensions": ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  "module": {
    "loaders": [
      {
        "test": /\.jsx?$/,
        "loader": "babel-loader",

        // Options to configure babel with
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
}
