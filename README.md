## What it does
- Use typescript compiler to compile your library into:
  - `lib` directory for commonjs code to consume
  - `lib-esm` directory for es2015 code to consume
- Use webpack version 4 to bundle the code into:
  - `bundle` directory as an UMD module for others 
- Setup npm scripts for easy build
  - `npm run dev` to compile to above directories
  - `npm run dev:watch` to watch the file changes (by nodemon) and run the build script
  - `npm run build` to generate minimized code for publish

## Useful links
- Refer to [tslint config](https://palantir.github.io/tslint/usage/configuration/) for tslint configuration details
- Refer to [nodemon config](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md) for nodemon configuration sample
- Refer to [webpack config](https://webpack.js.org/configuration/) for webpack configuration details