import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "polaris",
  sourceMap: true,
  srcDir: 'src',
  outputTargets: [
    {
      type: "docs-readme",
      footer: '*Built with love!*'
    },
    { 
      type: "docs-json",
      file: "dist/docs.json",
    },
    {
      type: 'dist'
    },
    {
      type: "www",
      serviceWorker: {
        globPatterns: [
          '**/*.{js,css,json,html,ico,png}'
        ]
      }, // disable service workers
      copy: [
        { src: 'style.css', dest: 'style.css' },
        { src: 'assets/favicon.ico', dest: 'favicon.ico' },
        { src: 'assets/robots.txt', dest: 'robots.txt' },
        { src: 'assets/favicon.ico', dest: 'example/favicon.ico' },

        { src: '../example/style.css', dest: 'example/style.css' },
        { src: '../example/index.html', dest: 'example/index.html' },
        { src: '../example/demo-bank.html', dest: 'example/demo-bank.html' },
        { src: '../example/components', dest: 'example/components' },
        { src: '../example/activities', dest: 'example/activities' },
        { src: '../example/validators', dest: 'example/validators' },
        { src: '../example/data', dest: 'example/data' },
        { src: '../example/wf', dest: 'example/wf' },

        { src: '../example/assets/manifest.webmanifest', dest: 'manifest.webmanifest' },
        { src: '../example/assets/manifest.webmanifest', dest: 'example/manifest.webmanifest' },
        { src: '../example/assets/*.png', dest: 'assets' },
        { src: '../example/assets/*.png', dest: 'example/assets' },
      ]
    }
    ,/*
    {
      type: 'www',
      dir: 'docs',
      serviceWorker: null,
      copy: [
        { src: '../www', dest: '' },
        { src: '../src/Polaris Workflow Design.png', dest: 'Polaris Workflow Design.png' }
      ]
    }*/
  ]
};
