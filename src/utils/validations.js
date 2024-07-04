import Cookies from "js-cookie";

// Function to validate email
export function isValidEmail(value) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(value);
}

// Function to validate name
export function isValidName(value) {
  const namePattern = /^[a-zA-Z\s]+$/;
  return namePattern.test(value);
}

// Function to validate phone number
export function isValidPhoneNumber(value) {
  // Regular expression to match the provided formats
  const phoneNumberPattern = /^(?:\+91|0)?[1-9]\d{9,13}$/;
  return phoneNumberPattern.test(value);
}
export function isValueInCookies(key) {
  // Retrieve the item from local storage
  let storedValue = Cookies.get(key);

  // Check if the stored value matches the input value
  if (storedValue?.length > 0) {
    return true;
  } else {
    return false;
  }
}

export function isImageFileName(filename) {
  // List of common image file extensions
  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "svg",
    "webp",
    "avif",
  ];

  // Extract the file extension from the filename
  const parts = filename.split(".");
  const extension = parts[parts.length - 1].toLowerCase();

  // Check if the extension is in the list of image extensions
  return imageExtensions.includes(extension);
}

//custome dehash function for UserID deshash or decode
export function customDehash(hash, secret) {
  const key = new TextEncoder().encode(secret);
  const hashArray = new Uint8Array(
    atob(hash)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const result = [];

  for (let i = 0; i < hashArray.length; i++) {
    result.push(hashArray[i] ^ key[i % key.length]);
  }

  return new TextDecoder().decode(new Uint8Array(result));
}
