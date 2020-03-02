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
    "revision": "18be95673b61bd2b1adeda3e4a9ccf7f"
  },
  {
    "url": "example/components/moon-header.js",
    "revision": "6fc9e74450b814bfe2e541e4643685c8"
  },
  {
    "url": "example/components/moon-label.js",
    "revision": "542bc3ecceb80dc81a6086ac1f0d6032"
  },
  {
    "url": "example/components/moon-panel.js",
    "revision": "c6b5fceb039128d7acadff502265cdef"
  },
  {
    "url": "example/components/polaris-loader.js",
    "revision": "697e91c64310b2a59a9ec6a371d2d649"
  },
  {
    "url": "example/components/polaris-main.js",
    "revision": "1cd78ccdd981c8e8fc73f0dc294d2951"
  },
  {
    "url": "example/components/polaris-menu.js",
    "revision": "82fb05f30910ce728f1a3580614daee1"
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
    "revision": "7bc7148932fa0350198d72943d12000f"
  },
  {
    "url": "style.css",
    "revision": "649a37c3ca60d06be850ba1292932689"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
