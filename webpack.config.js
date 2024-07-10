// webpack.config.js

module.exports = {
  // other webpack config settings
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  { prefix: ".shadow-root-container" },
                  require("postcss-prefix-selector")({
                    prefix: ".shadow-root-container",
                  }),
                ],
              },
            },
          },
        ],
      },
      // other rules for different file types can go here
    ],
  },
};
