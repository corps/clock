declare module "static-render-webpack-plugin" {
  class StaticSiteGeneratorPlugin {
    constructor(bundleJsName:string, renderPaths:{path:string, output:string}[])
  }

  export = StaticSiteGeneratorPlugin;
}