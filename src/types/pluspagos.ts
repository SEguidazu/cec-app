export interface PlusPagosConfig {
  secretKey: string;
  callbackSuccess: string;
  callbackCancel: string;
  sucursalComercio: string;
  monto: string;
}

export interface PlusPagosEncryptedData {
  callbackSuccess: string;
  callbackCancel: string;
  sucursalComercio: string;
  monto: string;
}

export interface PlusPagosPaymentParams {
  monto: number;
  sucursalComercio?: string;
}
