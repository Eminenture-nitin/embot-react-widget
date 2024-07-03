//slider trigger data convert format logic
export function STConvertDataFormat(input) {
  // Initialize the main subTriggers array
  const mainSubTriggers = input.subTriggers;

  // Initialize an empty array to hold the slides
  const slides = [];

  // Loop through the keys in the input object
  for (const key in input) {
    // Skip the 'subTriggers' key
    if (key === "subTriggers") continue;

    // Add the slide data to the slides array
    slides.push({
      ...input[key],
    });
  }

  // Return the transformed data
  return {
    format: "slider",
    subTriggers: mainSubTriggers,
    slides: slides,
  };
}
