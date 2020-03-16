![node](https://img.shields.io/node/v/@stencil/core)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Caracal-IT/polaris)
![GitHub](https://img.shields.io/github/license/Caracal-IT/polaris)
![GitHub issues](https://img.shields.io/github/issues/Caracal-IT/polaris)
![CircleCI](https://img.shields.io/circleci/build/github/Caracal-IT/polaris)
[![codecov](https://codecov.io/gh/Caracal-IT/polaris/branch/master/graph/badge.svg)](https://codecov.io/gh/Caracal-IT/polaris)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fcaracal-it.github.io%2Fpolaris)

# Polaris: A workflow engine to build web pages.
Building apps from without coding. We will be using configuration to build our apps.  
See the [Wiki](https://github.com/Caracal-IT/polaris/wiki) for more information.

## Why Polaris?
Why not write just the html page? 
Polaris will enable non programmers to build their own forms using a GUI builder.
The GUI builder will enable the user to specify the flow of the page by settings. 
You will be able to give the audiences different flows by using LaunchDarkly for example.

You'll get data binding, form validation, the ability to call api's and the abitity for different codepaths based 
on user interactions out of the box. 
 
Please refere to the Wiki for more information.

## Getting Started

You can try **_Polaris Workflow_** online at **_[Stackblits](https://stackblitz.com/edit/typescript-polaris-wf?file=index.html)_**

### Local
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
<polaris-workflow></polaris-workflow>
```
Load the process, refere to the wiki to setup the remote server to provide the process definitions.

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

Listen to messages, refere to the wiki for a complete list of events.

```tsx
<script>
  customElements
    .whenDefined("polaris-workflow")
    .then(() => {
      const wf = document.querySelector("polaris-workflow");
      wf.addEventListener("wfMessage", (event) => {
        switch(event.detail.type) {
          case "ERROR": console.log(event); break;
          case "VALIDATION_ERROR": console.log(event); break;
          ...
          ...
          default: console.log("Unknown Event"); break;
        }
      });
    });
</script>
```

To start developing your new Polaris project, run:

```bash
npm start
```
