// // twind.config.js
// import { defineConfig } from "@twind/core";
// import presetTailwind from "@twind/preset-tailwind";
// import presetAutoprefix from "@twind/preset-autoprefix";

// export default defineConfig({
//   presets: [presetAutoprefix(), presetTailwind()],
//   theme: {
//     extend: {
//       // Add your custom classes here
//       // Example for the iconify class
//       iconify: {
//         mingcute: "iconify--mingcute",
//       },
//     },
//   },
//   /* config */
// });
import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";

const customPlugin = {
  addUtilities: {
    ".mainForImageProperty": {
      "background-position": "center !important",
      "background-size": "cover !important",
      "background-repeat": "no-repeat !important",
    },
    ".chat-container": {
      "scrollbar-width": "thin" /* For Firefox */,
      "scrollbar-color": "transparent transparent" /* For Firefox */,
    },
    ".chat-container::-webkit-scrollbar": {
      width: "8px",
      height:
        "8px" /* Optional, if you want to control the horizontal scrollbar */,
    },
    ".chat-container::-webkit-scrollbar-track": {
      background: "transparent",
    },
    ".chat-container::-webkit-scrollbar-thumb": {
      "background-color": "#888",
      "border-radius": "10px",
      border: "2px solid #f1f1f1",
    },
    ".chat-container::-webkit-scrollbar": {
      display: "none",
    },
    ".chat-container:hover::-webkit-scrollbar": {
      display: "block",
    },
  },
};

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  plugins: [customPlugin],
});
