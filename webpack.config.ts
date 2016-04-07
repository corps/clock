import StaticSiteGeneratorPlugin = require("static-render-webpack-plugin");
import glob = require("glob");
import renderStaticSite = require("./src/webpack/static-sites/static-sites-entry");
import * as path from "path";
import {WebpackConfig} from "webpack";
import {srcDir, outDir} from "./src/webpack/paths";

require("lie/polyfill");

var entryFiles = glob.sync("**/*-entry.js", {
  cwd: srcDir,
});

var config:WebpackConfig = {
  context: __dirname,
  entry: {},
  output: {
    path: outDir,
    filename: "[name].js",
    libraryTarget: "umd",
  },
  plugins: [
    new StaticSiteGeneratorPlugin("static-sites.js", renderStaticSite.renderPaths)
  ]
};

for (var entryFile of entryFiles) {
  config.entry[path.basename(entryFile, ".js").replace(/-entry$/, "")] = path.join(srcDir, entryFile);
}

export = config;