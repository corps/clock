import * as React from "react";

var builds = {} as {[k:string]:string};
var lastPathId = -1;

export function addRendering(filename:string, rendered:string) {
  var nextPath = lastPathId++ + '';
  renderStaticSite.renderPaths.push({
    path: nextPath,
    output: filename,
  });

  builds[nextPath] = rendered;
}

interface RenderViewTemplate {
  (path:string, props:any, callback:(s:string)=>void):void
  renderPaths?:{path:string, output:string}[]
}

export var renderStaticSite = function (path:string, props:any, callback:(s:string)=>void) {
  callback(builds[path]);
} as RenderViewTemplate;
renderStaticSite.renderPaths = [];