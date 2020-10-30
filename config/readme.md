# Config Readme

## Webpack Configurations

The fairly standard Webpack setup would involve having three different Webpack config files derived from the same common config:
1. Production - distribution
2. Development - debugging etc
3. Test - for unit testing

Development build output is set using the `devtool` entry in the config file. This provides a great deal of flexibility about type out of output (minified, non-minified) and whether or how source maps are generated (see https://webpack.js.org/guides/development/).


However we have two different use-cases for a development build:
1. A non-minified and easily readable version for distribution
2. Easy debugging using source maps via the webpack development server.

Usually both of these use-cases would be easily achieved with `devtool:"source-map"` but there is a [known bug](https://github.com/webpack/webpack/issues/5491) with Chrome Developer tools in this configuration. So for now we've had to produce a separate config for each use case.

As a result there are four separate Webpack configurations, each derived from webpack.common.js, with the following purposes

| Config File | Purpose | Related NPM scripts |
|-----|-----|-----|
| webpack.prod.js | Generates minified output to `/dist` root | `build.prod` - runs this build<br>`build` - runs both `prod` and `nonmin` builds
| webpack.nonmin.js | Generates non-minified output and sourcemap to `/dist/nonmin/` | `build.nonmin` - runs this build<br>`build` - runs both `prod` and `nonmin` builds<br>`debug.nonmin` - starts dev server for this config in watch mode. (No need to build first)<br>`watch` - starts build in watch mode |
| webpack.dev.js | Generates output and sourcemap (debuggable by both Chrome and Firefox) for dev server | `debug` - starts dev server for this config in watch mode. (No need to build first)
| karma.config.js | Contains tiny webpack config to provide script only build for Karma test runner | `test` - runs Karma scripts in Chrome Browser in watch mode<br>`test.headless` - runs Karma scripts once in headless mode





