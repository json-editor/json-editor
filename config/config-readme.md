# Config Readme

## Webpack Configurations

There are four separate Webpack configurations, each derived from webpack.common.js, with the following purposes

| Config File | Purpose | Related NPM scripts |
|-----|-----|-----|
| webpack.prod.js | Generates minified output to `/dist` root | `build.prod` - runs this build<br>`build` - runs `both` prod and `nonmin` builds
| webpack.nonmin.js | Generates non-minified output to `/dist/nonmin/` | `build.nonmin` - runs this build<br>`build` - runs `both` prod and `nonmin` builds |
| webpack.dev.js | Provides on the fly debugging with sourcemap via webpack dev server | `start` - runs the dev server
| wepack.test.js | Provides script only build for Karma test runner | `test`





