import { p as patchBrowser, b as bootstrapLazy } from './index-49b5ce75.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["polaris-analytics",[[0,"polaris-analytics",null,[[4,"click","analyticsHandler"],[4,"wfMessage","wfMessage"]]]]],["polaris-workflow",[[0,"polaris-workflow",{"parent":[16],"tag":[1],"page":[16],"ctx":[16],"value":[8],"url":[1],"process":[1],"activity":[1],"sessionId":[1,"session-id"],"setServices":[64],"load":[64],"addActivity":[64],"addValidator":[64]}]]]], options);
});
