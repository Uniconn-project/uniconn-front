if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return c[s]||(e=new Promise((async e=>{if("document"in self){const c=document.createElement("script");c.src=s,document.head.appendChild(c),c.onload=e}else importScripts(s),e()}))),e.then((()=>{if(!c[s])throw new Error(`Module ${s} didn’t register its module`);return c[s]}))},e=(e,c)=>{Promise.all(e.map(s)).then((s=>c(1===s.length?s[0]:s)))},c={require:Promise.resolve(e)};self.define=(e,r,t)=>{c[e]||(c[e]=Promise.resolve().then((()=>{let c={};const n={uri:location.origin+e.slice(1)};return Promise.all(r.map((e=>{switch(e){case"exports":return c;case"module":return n;default:return s(e)}}))).then((s=>{const e=t(...s);return c.default||(c.default=e),c}))})))}}define("./sw.js",["./workbox-56079563"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/RNf8lgrKYx1X03bvLImVs/_buildManifest.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/RNf8lgrKYx1X03bvLImVs/_ssgManifest.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/0f1e41ffea3db5ae92b23f7bbd74ff67119dddf9.6f0064b608f73d1caeb2.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/454dfdeb11bcc3165ec9724ca7424f5508f2fe20.7af981178ac9c14418ac.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/87aacc8e60368af0c4bac3fd07550ef2f3b579f3.2b732172476ad63f305c.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/a5030ec2ddf1ffe31272bc520eddd9f6027f6c05.33d605546ec4219cf33c.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/b9eaa68fb4b10cab47dbff8f7a7221e0cd6bc88b.f547d0a3a20af5ad8cc2.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/commons.52c6874f20394c777a67.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/d27403eb00f9964b859a8b93300aac7009d23849.f06c6fe6751a054380cd.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/e04d7dba2926fdd62b02edef96a84b9b1772de8e.d3c5e13d76c85672f53d.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/e54ef545f9f56148b81c48685364a9d636bfb5b7.bd6456f7964ead3e756b.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/e8de8f98e659bcc25d0c295c519d97dc6a35599b.496fa5e70308ed314651.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/framework.6fff953eb0f638171baa.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/main-3dcbb9097dc4cefc7a07.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/404-31f108802cfe930465e9.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/500-97e8d27f311da8fd0bbc.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/_app-81d0ff14983615d6c9c9.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/_error-6e58174c99eab7c273be.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/create-project-54ba7f934e9494201d96.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/index-ccbda313e20f1e9acd2e.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/login-8d434a963ba3fe5a720f.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/messages-5e6619cdc047c733c815.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/notifications-f3bfd7ba604e29098084.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/profile-581b19e569437952cb1e.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/project/%5Bid%5D-ad6b2c33c5bf551dfd0f.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/projects-6046cfee391fbca4a025.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/projects/%5Bcategory%5D-592ce5d11fcbcca800fe.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/settings-10c8bc958ad9c120646f.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/signup-41d978d4c91f55d66c9b.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/user/%5Bslug%5D-e731250271e69e4db07f.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/pages/users-67f04e8c60f434baf622.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/polyfills-e4c38ea28892f36667af.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/css/72b35fc9e0c06121b84a.css",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/css/92061973ecb847ce2648.css",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/_next/static/css/f8dad1957c2f62dc8d76.css",revision:"RNf8lgrKYx1X03bvLImVs"},{url:"/app-icon.jpg",revision:"a64c60b31432d24a578d4ff6633ceee7"},{url:"/favicon.ico",revision:"7f101f768c05c8734350a201d8bd6e93"},{url:"/lp_intro.mp4",revision:"271c8845568260c545afc93f6c4734a8"},{url:"/manifest.json",revision:"bacfdc3bcdf8acda2df406a73197b3c1"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{requestWillFetch:async({request:s})=>(Request(),console.log("production"),s)}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:mp3|mp4)$/i,new s.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/api\/.*$/i,new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/.*/i,new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
