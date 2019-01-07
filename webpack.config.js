const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
   entry: "./src/index.ts",
   target: "node",
   mode: "development",
   output: {
      filename: "index.js",
      path: path.resolve(__dirname, "build")
   },
   resolve: {
      extensions: [".ts", ".tsx", ".js"]
   },
   module: {
      rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
   },
   externals: [webpackNodeExternals()]
};
