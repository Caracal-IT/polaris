import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-cda6bd5a.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["polaris-main",[[0,"polaris-main",null,[[8,"hashchange","locationChangeHandler"]]]]],["moon-button",[[1,"moon-button",{"ctx":[16],"caption":[1],"next":[1]}]]],["moon-header",[[1,"moon-header",{"caption":[1]}]]],["moon-label",[[1,"moon-label",{"caption":[1]}]]],["moon-panel",[[1,"moon-panel",{"caption":[1]}]]],["polaris-analytics",[[0,"polaris-analytics",null,[[4,"click","analyticsHandler"],[4,"wfMessage","wfMessage"]]]]],["polaris-loader",[[1,"polaris-loader",{"isVisible":[32]},[[4,"wfMessage","wfMessage"]]]]],["polaris-menu",[[1,"polaris-menu",{"items":[1],"ctx":[16],"process":[32]},[[8,"hashchange","locationChangeHandler"],[4,"wfMessage","wfMessage"]]]]],["polaris-workflow",[[0,"polaris-workflow",{"tag":[1],"ctx":[16],"value":[8],"process":[1],"activity":[1],"sessionId":[1,"session-id"],"setServices":[64],"load":[64]}]]]], options);
});
