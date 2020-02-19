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
        { src: 'workflow/process1.wf.json', dest: 'wf/process1' },
        { src: 'workflow/process2.wf.json', dest: 'wf/process2' },
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
