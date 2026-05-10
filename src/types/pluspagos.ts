// Configuración del servicio PlusPagos
export interface PlusPagosConfig {
  secretKey: string;
  comercio: string;
  callbackSuccess: string;
  callbackCancel: string;
  callbackPending: string;
  gatewayUrl: string;
}

// Datos del cliente (opcional)
export interface PlusPagosClientData {
  cuit?: string;
  nombreApellido?: string;
}

// Producto individual
export interface PlusPagosProduct {
  descripcion: string;
  monto?: number;
}

// Parámetros de pago (input del cliente)
export interface PlusPagosPaymentParams {
  monto: number;
  transaccionComercioId: string;
  productos?: PlusPagosProduct[];
  sucursalComercio?: string;
  userId?: string;
  informacion?: string;
  clientData?: PlusPagosClientData;
}

// Datos encriptados para envío al gateway
export interface PlusPagosEncryptedData {
  CALLBACKSUCCESS: string;
  CALLBACKCANCEL: string;
  CALLBACKPENDING: string;
  SUCURSALCOMERCIO?: string;
  USERID?: string;
  MONTO: string;
  INFORMACION?: string;
}

// Datos no encriptados para envío al gateway
export interface PlusPagosPlainData {
  COMERCIO: string;
  TRANSACCIONCOMERCIOID: string;
  PRODUCTO: Record<string, string>;
  MONTOPRODUCTO?: Record<string, string>;
  "CLIENTDATA.CUIT"?: string;
  "CLIENTDATA.NOMBREAPELLIDO"?: string;
}

// Datos completos para el POST (FormData)
export interface PlusPagosPostData extends PlusPagosEncryptedData, PlusPagosPlainData {}
