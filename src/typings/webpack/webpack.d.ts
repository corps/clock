declare module "webpack" {
  export interface WebpackConfig {
    context: string
    entry: {[k:string]:string|string[]},
    plugins?: any[],
    output: {
      path: string,
      filename: string,
      publicPath?: string,
      libraryTarget?: string,
    }
  }
}