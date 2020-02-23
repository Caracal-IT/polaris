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
    "url": "build/p-0rvtj4ym.entry.js"
  },
  {
    "url": "build/p-1826e5f0.js"
  },
  {
    "url": "build/p-3b66a627.js"
  },
  {
    "url": "build/p-6eb4fc33.js"
  },
  {
    "url": "build/p-6jjumjkk.entry.js"
  },
  {
    "url": "build/p-7afw0axa.entry.js"
  },
  {
    "url": "build/p-93e23355.js"
  },
  {
    "url": "build/p-lbgrcfka.entry.js"
  },
  {
    "url": "build/p-pcdrsyg5.entry.js"
  },
  {
    "url": "build/p-vv9numk3.entry.js"
  },
  {
    "url": "build/p-x9refvjo.entry.js"
  },
  {
    "url": "index.html",
    "revision": "7030145eb5c18bd36eee033c42363c79"
  },
  {
    "url": "redirect.html",
    "revision": "7714aede174ae202a3d96e8294bb066c"
  },
  {
    "url": "style.css",
    "revision": "548de00623550812e61abc724f4aa251"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
