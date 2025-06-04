import CryptoJS from 'crypto-js';

export function encrypt(data: object, key: string): string {
  const stringified = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringified, key).toString();
}

export function decrypt(cipher: string, key: string): any {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error('Invalid decryption result');
    return JSON.parse(decrypted);
  } catch (error) {
    console.warn('Failed to decrypt persisted state:', error);
    return null;
  }
}
