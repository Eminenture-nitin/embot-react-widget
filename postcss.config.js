const postcss = require("postcss");
const prefixSelector = require("postcss-prefix-selector");

module.exports = {
  plugins: [
    postcss.plugin(
      "postcss-prefix-selector",
      (opts = { prefix: ".shadow-root-container" }) => {
        return (root) => {
          root.walkRules((rule) => {
            // Avoid prefixing selectors starting with 'html' or 'body'
            if (
              !rule.selector.startsWith("html") &&
              !rule.selector.startsWith("body")
            ) {
              rule.selector = prefixSelector(opts.prefix, rule.selector);
            }
          });
        };
      }
    ),
  ],
};
