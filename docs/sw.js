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
    "url": "assets/favicon.ico",
    "revision": "2c49ddd4d8914ddb330f07ba8a6a285b"
  },
  {
    "url": "build/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "build/p-b524caa1.entry.js"
  },
  {
    "url": "build/p-dfaa3b68.js"
  },
  {
    "url": "example/activities/custom.activity.js",
    "revision": "e7e143bfb691847961bb0ba6dcff49c1"
  },
  {
    "url": "example/components/moon-button.component.js",
    "revision": "2d1ae01d49189c8c69169fe0afdf6fd5"
  },
  {
    "url": "example/components/moon-header.component.js",
    "revision": "d03e4d1e092ee8843d8b77fa1ef60c76"
  },
  {
    "url": "example/components/moon-label.component.js",
    "revision": "9b6433ac9c806f2db6edfe3470819eb7"
  },
  {
    "url": "example/components/moon-panel.component.js",
    "revision": "91f74d42f101e4d06f999ca1c31b9512"
  },
  {
    "url": "example/components/polaris-loader.component.js",
    "revision": "4f8de1b7a087b1aa48ba70b3d26efc1a"
  },
  {
    "url": "example/components/polaris-main.component.js",
    "revision": "8cc0f3bfe47e84c99c9be01c3207b82f"
  },
  {
    "url": "example/components/polaris-menu.component.js",
    "revision": "4a28066a1a6b7255d004ee2462742034"
  },
  {
    "url": "example/data/menu.json",
    "revision": "d3a58881f9fb79ebe504363ef8cf2772"
  },
  {
    "url": "example/data/settings.json",
    "revision": "3b51472a5192123110594f98a2e5e100"
  },
  {
    "url": "example/data/user.json",
    "revision": "013120e8cac780a403fadb4fa1f90142"
  },
  {
    "url": "example/favicon.ico",
    "revision": "2c49ddd4d8914ddb330f07ba8a6a285b"
  },
  {
    "url": "example/index.html",
    "revision": "ed462b8c4945fff5d83845f1d54d06e4"
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
    "url": "example/validators/not13.validator.js",
    "revision": "ae090b7c0d9d3066400815b8522d4537"
  },
  {
    "url": "example/validators/validator.js",
    "revision": "daf466f8f35f7ec0ff8acda6915112ae"
  },
  {
    "url": "example/wf/default.wf.json",
    "revision": "eb873ff8ef4c4c316836b7ed666a7569"
  },
  {
    "url": "example/wf/deposit.wf.json",
    "revision": "cbebd09a3e3613a293793e85f34d7d95"
  },
  {
    "url": "example/wf/home.wf.json",
    "revision": "fc9d5aca23a9c42e8409b5dc08f8f32a"
  },
  {
    "url": "example/wf/login.wf.json",
    "revision": "f91cf97b7941b6c6bd5cb89659c23fe1"
  },
  {
    "url": "example/wf/react.wf.json",
    "revision": "86bd0c86f4923968a5f9fd6098d78dd8"
  },
  {
    "url": "example/wf/registration.wf.json",
    "revision": "7190dcb6c0c635612688c9d426c0888d"
  },
  {
    "url": "example/wf/router.wf.json",
    "revision": "92942a64ade717ec251c65afdc9fc8b4"
  },
  {
    "url": "favicon.ico",
    "revision": "2c49ddd4d8914ddb330f07ba8a6a285b"
  },
  {
    "url": "index.html",
    "revision": "59d5bafb3ecc4dfb8fe1b9346bad23dc"
  },
  {
    "url": "style.css",
    "revision": "e25abe0b5cfee4199799120a42a698ca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
