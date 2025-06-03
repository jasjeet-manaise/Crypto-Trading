import CryptoJS from "crypto-js";

const SECRET_KEY = "CRYPTO_TRADING_SECRET";

export function encrypt(data: object): string {
  const stringified = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
}

export function decrypt(cipher: string): any {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error("Invalid decryption result");
    return JSON.parse(decrypted);
  } catch (error) {
    console.warn("Failed to decrypt persisted state:", error);
    return null;
  }
}
