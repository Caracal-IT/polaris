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
    "url": "build/p-i8kl8qon.entry.js"
  },
  {
    "url": "example/components/moon-button.js",
    "revision": "2d1ae01d49189c8c69169fe0afdf6fd5"
  },
  {
    "url": "example/components/moon-header.js",
    "revision": "d03e4d1e092ee8843d8b77fa1ef60c76"
  },
  {
    "url": "example/components/moon-label.js",
    "revision": "9b6433ac9c806f2db6edfe3470819eb7"
  },
  {
    "url": "example/components/moon-panel.js",
    "revision": "91f74d42f101e4d06f999ca1c31b9512"
  },
  {
    "url": "example/components/polaris-loader.js",
    "revision": "4f8de1b7a087b1aa48ba70b3d26efc1a"
  },
  {
    "url": "example/components/polaris-main.js",
    "revision": "8cc0f3bfe47e84c99c9be01c3207b82f"
  },
  {
    "url": "example/components/polaris-menu.js",
    "revision": "4a28066a1a6b7255d004ee2462742034"
  },
  {
    "url": "example/index.html",
    "revision": "f5dbbe4b29eb9e2b1f71fdb5eb533bff"
  },
  {
    "url": "example/redirect.html",
    "revision": "4f5582469416905b535343b09de8f0f1"
  },
  {
    "url": "example/style.css",
    "revision": "548de00623550812e61abc724f4aa251"
  },
  {
    "url": "index.html",
    "revision": "6fe1cbbd4c1513108e104c739db2ff13"
  },
  {
    "url": "style.css",
    "revision": "e25abe0b5cfee4199799120a42a698ca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
