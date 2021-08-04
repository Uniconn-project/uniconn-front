if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js')
      let s = Promise.resolve()
      return (
        c[e] ||
          (s = new Promise(async s => {
            if ('document' in self) {
              const c = document.createElement('script')
              ;(c.src = e), document.head.appendChild(c), (c.onload = s)
            } else importScripts(e), s()
          })),
        s.then(() => {
          if (!c[e]) throw new Error(`Module ${e} didn’t register its module`)
          return c[e]
        })
      )
    },
    s = (s, c) => {
      Promise.all(s.map(e)).then(e => c(1 === e.length ? e[0] : e))
    },
    c = { require: Promise.resolve(s) }
  self.define = (s, t, n) => {
    c[s] ||
      (c[s] = Promise.resolve().then(() => {
        let c = {}
        const a = { uri: location.origin + s.slice(1) }
        return Promise.all(
          t.map(s => {
            switch (s) {
              case 'exports':
                return c
              case 'module':
                return a
              default:
                return e(s)
            }
          })
        ).then(e => {
          const s = n(...e)
          return c.default || (c.default = s), c
        })
      }))
  }
}
define('./sw.js', ['./workbox-56079563'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/53MYCjYokwpLwvD2y6wvy/_buildManifest.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/53MYCjYokwpLwvD2y6wvy/_ssgManifest.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/10c193e3626fbffb8dc3793a7e14df4c711d7b2c.2bf2eb9fd7b4fadfc406.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/13e9eddab76fec1a6c1556af13cbe21bebcf8d0d.feee94cb6a8d88f39abe.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/7dbdb3149c9f2d78372829c21233acfd4748d6ec.f547d0a3a20af5ad8cc2.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/820b559020c4d754106c0081db392f028ddaf367.d3c5e13d76c85672f53d.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/851319c1e2019a7b6a99f098a1472f6ccd92b36f.5194491f055934f19b08.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/8a887905882e5bc8fbd1ff26491a53e644115a4f.62378abd3f5b771e1c3e.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/commons.52c6874f20394c777a67.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/d0cf291af95ab22a564ceda338a7829dbcded0b6.d407f30c5ea9e2a8e613.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/e8de8f98e659bcc25d0c295c519d97dc6a35599b.8cff159ff8b473ae36d4.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/framework.6fff953eb0f638171baa.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/main-b1b922a1328c6f026218.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/404-4f32eb2abe9e814ec472.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/500-ec71938ef586d78a6448.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/_app-df147910b3c7a347a6c2.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/_error-051f54396651fad96a84.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/pages/create-project-0a300ff789513c76ba00.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/index-f4c5aa3868c66c38cf75.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/login-5fdddf886353dddabe96.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/pages/notifications-1fe9f8f564d83c0fd7a1.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/profile-64a8a11219265027a706.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/pages/project/%5Bid%5D-4ad548288d9088d09810.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/projects-0e8de8dfbe7eed16e700.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/pages/projects/%5Bcategory%5D-1c5318f3d789e2469943.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/settings-16bb2653413960d2e9ed.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/signup-7612cb11a9d197ae423d.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url:
            '/_next/static/chunks/pages/user/%5Bslug%5D-8d83e861b405c282a090.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/pages/users-7388810aaf59c00569fb.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/polyfills-265a51dacb3992e55d6f.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/css/108cd9feac3b91004493.css',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/css/72b35fc9e0c06121b84a.css',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        {
          url: '/_next/static/css/f8dad1957c2f62dc8d76.css',
          revision: '53MYCjYokwpLwvD2y6wvy'
        },
        { url: '/favicon.ico', revision: '7f101f768c05c8734350a201d8bd6e93' },
        { url: '/lp_intro.mp4', revision: '271c8845568260c545afc93f6c4734a8' },
        { url: '/manifest.json', revision: 'cdc9b48c4f1bf05044a909aa1eb83a15' }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            requestWillFetch: async ({ request: e }) => (
              Request(), console.log('production'), e
            )
          }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-img-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-media-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0
          })
        ]
      }),
      'GET'
    )
})
