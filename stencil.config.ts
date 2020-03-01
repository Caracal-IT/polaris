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
        { src: '../example/index.html', dest: 'example/index.html' },
        { src: '../example/redirect.html', dest: 'example/redirect.html' },
        { src: '../example/components', dest: 'example/components' },

        { src: '../example/wf/default.wf.json', dest: 'example/wf/default' },
        { src: '../example/wf/home.wf.json', dest: 'example/wf/home' },
        { src: '../example/wf/registration.wf.json', dest: 'example/wf/registration' },
        { src: '../example/wf/deposit.wf.json', dest: 'example/wf/deposit' },
        { src: '../example/wf/login.wf.json', dest: 'example/wf/login' },
        { src: '../example/wf/loginA.wf.json', dest: 'example/wf/loginA' },
        { src: '../example/wf/clients.wf.json', dest: 'example/wf/clients' },
        { src: '../example/wf/user.json', dest: 'example/wf/user' },
        { src: '../example/wf/menu.json', dest: 'example/wf/menu' },
        { src: '../example/wf/settings.json', dest: 'example/wf/settings' },

        { src: 'workflow/default.wf.json', dest: 'wf/default' },
        { src: 'workflow/home.wf.json', dest: 'wf/home' },
        { src: 'workflow/registration.wf.json', dest: 'wf/registration' },
        { src: 'workflow/deposit.wf.json', dest: 'wf/deposit' },
        { src: 'workflow/login.wf.json', dest: 'wf/login' },
        { src: 'workflow/loginA.wf.json', dest: 'wf/loginA' },
        { src: 'workflow/clients.wf.json', dest: 'wf/clients' },
        { src: 'workflow/user.json', dest: 'wf/user' },
        { src: 'workflow/menu.json', dest: 'wf/menu' },
        { src: 'workflow/settings.json', dest: 'wf/settings' },
        { src: 'redirect.html', dest: 'redirect.html' }
      ]
    }
    ,/*
    {
      type: 'www',
      dir: 'docs',
      serviceWorker: null,
      copy: [
        { src: '../www', dest: '' }
      ]
    }
*/
  ]
};
