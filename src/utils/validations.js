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
export function isValueInLocalStorage(key) {
  // Retrieve the item from local storage
  let storedValue = localStorage.getItem(key);

  // Check if the stored value matches the input value
  if (storedValue.length > 0) {
    return true;
  } else {
    return false;
  }
}
