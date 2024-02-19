const crypto = require("crypto");

// Function to generate a random secret key
function generateRandomKey() {
  // The key length can be adjusted based on your security requirements
  const keyLength = 32; // 32 bytes for a 256-bit key

  // Generate a random buffer of the specified length
  const buffer = crypto.randomBytes(keyLength);

  // Convert the buffer to a hexadecimal string
  const key = buffer.toString("hex");

  return key;
}

// Export the function to make it accessible in other modules
module.exports = generateRandomKey;

// Example usage
const secretKey = generateRandomKey();
console.log("Generated Secret Key:", secretKey);
