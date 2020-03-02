/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "build/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "build/p-1826e5f0.js"
  },
  {
    "url": "build/p-3b66a627.js"
  },
  {
    "url": "build/p-6c48c477.js"
  },
  {
    "url": "build/p-dc0ixstq.entry.js"
  },
  {
    "url": "build/p-yqspgmec.entry.js"
  },
  {
    "url": "example/components/moon-button.js",
    "revision": "4982a1ec3a9d5a871814921833ab2a95"
  },
  {
    "url": "example/components/moon-header.js",
    "revision": "b4abf38d67fb2204db8154344432ec26"
  },
  {
    "url": "example/components/moon-label.js",
    "revision": "d045a28dda2341b6bd1f8502485418cf"
  },
  {
    "url": "example/components/moon-panel.js",
    "revision": "db50af738f7d594637ecdd02ff40272f"
  },
  {
    "url": "example/components/polaris-loader.js",
    "revision": "697e91c64310b2a59a9ec6a371d2d649"
  },
  {
    "url": "example/components/polaris-main.js",
    "revision": "a789655bd5f48714fd50a19ad74f90b6"
  },
  {
    "url": "example/components/polaris-menu.js",
    "revision": "b03839fada371af529fea971d63f4412"
  },
  {
    "url": "example/index.html",
    "revision": "b8152a41fef5b3a546bf41be009daf26"
  },
  {
    "url": "example/redirect.html",
    "revision": "56de1f8894e5cfd1212e2f075c62d40a"
  },
  {
    "url": "example/style.css",
    "revision": "8caf3ce3e0d4c7d9895eafcafaccdc12"
  },
  {
    "url": "index.html",
    "revision": "a7012867636b7195a820ef7a62b5599d"
  },
  {
    "url": "style.css",
    "revision": "24f739c71a5cdc0cd9ea4f0447b24faf"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
