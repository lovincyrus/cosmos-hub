module.exports = {
  target: 'serverless',
  webpack: function (config, { isServer }) {
    config.node = {
      fs: 'empty'
    }
    return config
  }
}