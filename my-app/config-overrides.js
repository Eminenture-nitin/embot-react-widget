/* config-overrides.js */
const path = require("path");
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return {
    ...config,
    output: {
      filename: "static/js/my-widget.js",
      chunkFilename: "static/js/my-widget.[name].js",
      path: "C:UsersiconDesktopembot-react-widgetmy-app\build",
      pathinfo: false,
      futureEmitAssets: true,
      publicPath: "/",
      jsonpFunction: "webpackJsonpmy-embeddable-widget",
      globalObject: "this",
    },
  };
};
