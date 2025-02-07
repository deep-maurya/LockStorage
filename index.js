const CryptoJS = require("crypto-js");

// Encrypt and store data
const setSecureItem = (key, value, secretKey = "default-secret-key") => {
  try {
    if (!secretKey) throw new Error("Encryption key is required!");
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secretKey
    ).toString();
    localStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error("Error encrypting data", error);
  }
};

// Retrieve and decrypt data
const getSecureItem = (key, secretKey = "default-secret-key") => {
  try {
    if (!secretKey) throw new Error("Decryption key is required!");
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error decrypting data", error);
    return null;
  }
};

// Remove item from localStorage
const removeSecureItem = (key) => {
  localStorage.removeItem(key);
};

// Clear all localStorage data
const clearSecureStorage = () => {
  localStorage.clear();
};

// Export functions
module.exports = {
  setSecureItem,
  getSecureItem,
  removeSecureItem,
  clearSecureStorage,
};
