declare global {
  interface Window {
    AESEncrypter: {
      encryptString: (data: string, secretKey: string) => string;
      decryptString: (encryptedData: string, secretKey: string) => string;
    };
  }
}

export {};
