System.register(['./index-85f2877b.system.js', './app-globals-497eb362.system.js'], function () {
    'use strict';
    var patchBrowser, bootstrapLazy, globalScripts;
    return {
        setters: [function (module) {
                patchBrowser = module.p;
                bootstrapLazy = module.b;
            }, function (module) {
                globalScripts = module.g;
            }],
        execute: function () {
            patchBrowser().then(function (options) {
                globalScripts();
                return bootstrapLazy([["polaris-analytics.system", [[0, "polaris-analytics", null, [[4, "click", "analyticsHandler"], [4, "wfMessage", "wfMessage"]]]]], ["polaris-workflow.system", [[0, "polaris-workflow", { "parent": [16], "tag": [1], "page": [16], "ctx": [16], "value": [8], "url": [1], "process": [1], "activity": [1], "sessionId": [1, "session-id"], "setServices": [64], "load": [64], "addActivity": [64], "addValidator": [64] }]]]], options);
            });
        }
    };
});
