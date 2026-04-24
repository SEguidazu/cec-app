declare module "pluspagos-aes-encryption" {
  export default {
    encryptString(text: string, secretKey: string): string;
  };
}
