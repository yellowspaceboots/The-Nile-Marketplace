module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: 'graphql-import-loader' }]
      }
    ]
  }
}
