import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "polaris",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme",
      footer: '*Built with love!*'
    },
    { 
      type: "docs-json",
      file: "dist/docs.json"
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
        { src: 'assets/favicon.ico', dest: 'example/favicon.ico' },

        { src: '../example/style.css', dest: 'example/style.css' },
        { src: '../example/index.html', dest: 'example/index.html' },
        { src: '../example/redirect.html', dest: 'example/redirect.html' },
        { src: '../example/components', dest: 'example/components' },
        { src: '../example/activities', dest: 'example/activities' },
        { src: '../example/validators', dest: 'example/validators' },
        { src: '../dist/collection/', dest: 'polaris' },

        { src: '../example/wf/default.wf.json', dest: 'example/wf/default' },
        { src: '../example/wf/home.wf.json', dest: 'example/wf/home' },
        { src: '../example/wf/registration.wf.json', dest: 'example/wf/registration' },
        { src: '../example/wf/deposit.wf.json', dest: 'example/wf/deposit' },
        { src: '../example/wf/login.wf.json', dest: 'example/wf/login' },
        { src: '../example/wf/router.wf.json', dest: 'example/wf/router' },
                
        { src: '../example/wf/user.json', dest: 'example/wf/user' },
        { src: '../example/wf/menu.json', dest: 'example/wf/menu' },
        { src: '../example/wf/settings.json', dest: 'example/wf/settings' }
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
    }
*/
  ]
};
