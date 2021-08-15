const withPWA = require('next-pwa')

module.exports = withPWA({
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,   // Check for changes every second
      aggregateTimeout: 300,   // delay before rebuilding
    };
    return config;
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  },
  images: {
    loader: 'default',
    domains: ['uniconn-bucket.s3.amazonaws.com'],
    deviceSizes: [640, 768, 1024, 1280, 1536]
  }
})
