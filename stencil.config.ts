import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "polaris",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'style.css', dest: 'style.css' },
        { src: 'workflow/default.wf.json', dest: 'wf/registration' },
        { src: 'workflow/registration.wf.json', dest: 'wf/registration' },
        { src: 'workflow/deposit.wf.json', dest: 'wf/deposit' },
        { src: 'workflow/login.wf.json', dest: 'wf/login' },
        { src: 'workflow/user.wf.json', dest: 'wf/user' },
        { src: 'redirect.html', dest: 'redirect.html' },
        { src: 'demo', dest: 'demo' }
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
    }
*/
  ]
};
