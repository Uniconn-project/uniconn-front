const withPWA = require('next-pwa')

module.exports = withPWA({
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
