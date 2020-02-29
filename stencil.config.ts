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
        { src: '../www', dest: '' },
        { src: 'demo', dest: 'demo' }
      ]
    }*/

  ]
};
