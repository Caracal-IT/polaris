![node](https://img.shields.io/node/v/@stencil/core)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Caracal-IT/polaris)
![GitHub](https://img.shields.io/github/license/Caracal-IT/polaris)
![GitHub issues](https://img.shields.io/github/issues/Caracal-IT/polaris)
![CircleCI](https://img.shields.io/circleci/build/github/Caracal-IT/polaris)
[![codecov](https://codecov.io/gh/Caracal-IT/polaris/branch/master/graph/badge.svg)](https://codecov.io/gh/Caracal-IT/polaris)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fcaracal-it.github.io%2Fpolaris)

# Polaris: A workflow engine to build web pages.

## Why Polaris?
Why not write just the html page? Polaris will enable non programmers to build their own forms.
You'll get dats binding, the ability to call api's and desissions out of the box. The GUI builder
will enable the user to specify the flow of the page by settings. You will be able to give the audiences 
different flows by using LaunchDarkly for example. Please refere to the Wiki for more information.

## Getting Started

Add polaris to your application

```bash
npm install caracal_polaris --save
```

Add the scripts to your page.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Polaris Workflow</title>

  <link rel="stylesheet" href="style.css" />
  <script type="module" src="node_modules/caracal_polaris/dist/polaris/polaris.esm.js"></script>
  <script nomodule src="node_modules/caracal_polaris/dist/polaris/polaris.js"></script>
</head>
```

Add the element to your page.

```html
<polaris-analytics></polaris-analytics>
<polaris-loader></polaris-loader>
<polaris-workflow></polaris-workflow>
```
Load the process

```javascript
<script>
  const process = {
    "name" : "demo",
    "activities": [
      {
        "name": "start",
        "type": "page-activity",            
        "controls": [
            {"tag" : "h1", "innerHTML": "Polaris" },
            {"tag" : "span", "innerHTML": "Welcome to polaris workflow" }                    
        ]        
      }
    ]
  };

  customElements
    .whenDefined("polaris-workflow")
    .then(() => {

      const wf = document.querySelector("polaris-workflow");
      wf.load(process);
    });
</script>
```

To start developing your new Polaris project, run:

```bash
npm start
```
