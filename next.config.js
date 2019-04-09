module.exports = {
  target: 'serverless',
  webpack: function(config) {
    config.node = {
      fs: 'empty'
    }
    return config
  }
}