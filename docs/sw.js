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
    "url": "build/p-802f252a.js"
  },
  {
    "url": "build/p-93e23355.js"
  },
  {
    "url": "build/p-fqujnumw.entry.js"
  },
  {
    "url": "build/p-mj9ryvyd.entry.js"
  },
  {
    "url": "build/p-ukjlamu2.entry.js"
  },
  {
    "url": "build/p-vuhtlx1w.entry.js"
  },
  {
    "url": "build/p-wh9iz8bi.entry.js"
  },
  {
    "url": "build/p-yn5szeaa.entry.js"
  },
  {
    "url": "build/p-ztzco3hk.entry.js"
  },
  {
    "url": "index.html",
    "revision": "3e89c5450738b46700da6bb527b49969"
  },
  {
    "url": "redirect.html",
    "revision": "56de1f8894e5cfd1212e2f075c62d40a"
  },
  {
    "url": "style.css",
    "revision": "8caf3ce3e0d4c7d9895eafcafaccdc12"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
