if (!self.define) {
  const s = s => {
      'require' !== s && (s += '.js')
      let e = Promise.resolve()
      return (
        c[s] ||
          (e = new Promise(async e => {
            if ('document' in self) {
              const c = document.createElement('script')
              ;(c.src = s), document.head.appendChild(c), (c.onload = e)
            } else importScripts(s), e()
          })),
        e.then(() => {
          if (!c[s]) throw new Error(`Module ${s} didn’t register its module`)
          return c[s]
        })
      )
    },
    e = (e, c) => {
      Promise.all(e.map(s)).then(s => c(1 === s.length ? s[0] : s))
    },
    c = { require: Promise.resolve(e) }
  self.define = (e, a, t) => {
    c[e] ||
      (c[e] = Promise.resolve().then(() => {
        let c = {}
        const n = { uri: location.origin + e.slice(1) }
        return Promise.all(
          a.map(e => {
            switch (e) {
              case 'exports':
                return c
              case 'module':
                return n
              default:
                return s(e)
            }
          })
        ).then(s => {
          const e = t(...s)
          return c.default || (c.default = e), c
        })
      }))
  }
}
define('./sw.js', ['./workbox-56079563'], function (s) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        {
          url: '/_next/static/9s3xQqaxx_cwUlLZIAXhK/_buildManifest.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/9s3xQqaxx_cwUlLZIAXhK/_ssgManifest.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/04a19ddd4130bf865da766254d16216c19619701.d89a4d5857e97c22e452.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/14c160f358e01a2c0672d463c3961fb14eddc7ab.3b951ec02ef0741f1370.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/2652db7522f8951b5689473ad5609f005456831e.c6ea7bc0bda460dfa062.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/460c2c6786169381ab8d7203393c37b6f76b301c.9d7c9925fa4552d564d8.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/5136c21ec5412ce0717867639ce4586a88ff8250.0b36c624e18c3f50d5af.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/bcb2ecabd09ae1b467898fd59af68bcb9db16768.2c764fa965a8c1ec4665.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/c916a4f4414e30a910b18b8ab9b4d1370cd75865.b7e5f9aa9d8dbfe41966.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/commons.52c6874f20394c777a67.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/ddbeddb83d4f8b277eda21d16b089dfeea640cd3.01a71250e5948f87f419.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/framework.6fff953eb0f638171baa.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/main-b1b922a1328c6f026218.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/404-ded974fdc5e069741a2e.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/500-e95ed3da3d90d8227910.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/_app-f1fb5339c35d24b5d2ce.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/_error-051f54396651fad96a84.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/pages/create-project-3f7c8da797cfc824067f.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/home-a84dab4bb13de4363c5a.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/index-335839fe43f8d1add9c9.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/login-9098bd041d5416a106cd.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/pages/notifications-f8280fbe9cf44a8e7eba.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/profile-a15f3ad3378df8fc3af0.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/pages/project/%5Bid%5D-53201966952ba1ccf9ce.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/signup-c76dd3f2200d101260c0.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/pages/signup/mentor-57421c59263d11bcca91.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/pages/signup/student-8ef3fdbcb207baa6114e.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url:
            '/_next/static/chunks/pages/user/%5Bslug%5D-c4894bd817926cdb7f4c.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/pages/users-0b561f5bb5ead7420fcf.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/polyfills-265a51dacb3992e55d6f.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/css/e57801176f755ecf3f4e.css',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        {
          url: '/_next/static/css/f8dad1957c2f62dc8d76.css',
          revision: '9s3xQqaxx_cwUlLZIAXhK'
        },
        { url: '/favicon.ico', revision: '7f101f768c05c8734350a201d8bd6e93' },
        { url: '/manifest.json', revision: 'cdc9b48c4f1bf05044a909aa1eb83a15' }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      '/',
      new s.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            requestWillFetch: async ({ request: s }) => (
              Request(), console.log('production'), s
            )
          }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new s.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-media-assets',
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:js)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:css|less)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new s.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\/api\/.*$/i,
      new s.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /.*/i,
      new s.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    )
})
