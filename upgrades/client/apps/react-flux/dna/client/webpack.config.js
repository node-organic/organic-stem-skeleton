module.exports = {
  "module": {
    "loaders": [
      {
        "test": /\.js$/,
        "loader": "babel-loader",

        // Options to configure babel with
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
}
