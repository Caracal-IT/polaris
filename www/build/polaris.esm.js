import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-59ffa22c.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["moon-panel",[[1,"moon-panel",{"caption":[1]}]]],["polaris-analytics",[[1,"polaris-analytics"]]],["polaris-workflow",[[0,"polaris-workflow",{"tag":[1],"ctx":[16],"value":[8],"process":[1]}]]]], options);
});
