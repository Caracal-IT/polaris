import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-68ff5f14.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["moon-button",[[1,"moon-button",{"ctx":[16],"caption":[1],"next":[1]}]]],["moon-panel",[[1,"moon-panel",{"caption":[1]}]]],["polaris-analytics",[[0,"polaris-analytics",null,[[4,"click","analyticsHandler"],[4,"wfMessage","wfMessage"]]]]],["polaris-workflow",[[0,"polaris-workflow",{"tag":[1],"ctx":[16],"value":[8],"process":[1]}]]]], options);
});
