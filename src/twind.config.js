// twind.config.js
import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  theme: {
    extend: {
      // Add your custom classes here
      // Example for the iconify class
      iconify: {
        mingcute: "iconify--mingcute",
      },
    },
  },
  /* config */
});
