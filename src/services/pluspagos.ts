import type {
  PlusPagosConfig,
  PlusPagosEncryptedData,
  PlusPagosPaymentParams,
} from "@/types/pluspagos";

export class PlusPagosService {
  private config: PlusPagosConfig;

  constructor(config: PlusPagosConfig) {
    this.config = config;
  }

  /**
   * Transforma un monto decimal al formato entero requerido por Click de Pago
   * Ejemplo: $943.00 -> 94300, $4.00 -> 400
   */
  private transformAmount(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Genera los campos de producto con índices [0, 1, 2, ...]
   */
  private generateProductFields(
    productos?: Array<{ descripcion: string; monto?: number }>,
  ): { producto: Record<string, string>; montoProducto?: Record<string, string> } {
    if (!productos || productos.length === 0) {
      return { producto: {} };
    }

    const producto: Record<string, string> = {};
    const montoProducto: Record<string, string> = {};

    productos.forEach((prod, index) => {
      producto[`PRODUCTO[${index}]`] = prod.descripcion;
      if (prod.monto !== undefined) {
        montoProducto[`MONTOPRODUCTO[${index}]`] = this.transformAmount(
          prod.monto,
        ).toString();
      }
    });

    return { producto, montoProducto: Object.keys(montoProducto).length > 0 ? montoProducto : undefined };
  }

  /**
   * Encripta un valor si está presente
   */
  private encryptValue(value: string | undefined): string | undefined {
    if (!value) return undefined;
    return window.AESEncrypter.encryptString(value, this.config.secretKey);
  }

  /**
   * Prepara los datos encriptados según la especificación de Click de Pago
   * Campos marcados con SÍ en la documentación se encriptan
   */
  private prepareEncryptedData(params: PlusPagosPaymentParams): PlusPagosEncryptedData {
    const montoTransformado = this.transformAmount(params.monto);

    return {
      CALLBACKSUCCESS: this.encryptValue(this.config.callbackSuccess)!,
      CALLBACKCANCEL: this.encryptValue(this.config.callbackCancel)!,
      CALLBACKPENDING: this.encryptValue(this.config.callbackPending)!,
      SUCURSALCOMERCIO: this.encryptValue(params.sucursalComercio),
      USERID: this.encryptValue(params.userId),
      MONTO: this.encryptValue(montoTransformado.toString())!,
      INFORMACION: this.encryptValue(params.informacion),
    };
  }

  /**
   * Prepara los datos no encriptados según la especificación
   */
  private preparePlainData(params: PlusPagosPaymentParams) {
    const { producto, montoProducto } = this.generateProductFields(params.productos);

    return {
      COMERCIO: this.config.comercio,
      TRANSACCIONCOMERCIOID: params.transaccionComercioId,
      PRODUCTO: producto,
      MONTOPRODUCTO: montoProducto,
      "CLIENTDATA.CUIT": params.clientData?.cuit,
      "CLIENTDATA.NOMBREAPELLIDO": params.clientData?.nombreApellido,
    };
  }

  /**
   * Genera el FormData completo para el POST al gateway
   */
  generatePostData(params: PlusPagosPaymentParams): FormData {
    const encryptedData = this.prepareEncryptedData(params);
    const plainData = this.preparePlainData(params);

    const formData = new FormData();

    // Agregar campos encriptados
    Object.entries(encryptedData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    // Agregar campos no encriptados
    Object.entries(plainData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === "object") {
          // Manejar arrays como PRODUCTO[0], PRODUCTO[1], etc.
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(subKey, subValue as string);
          });
        } else {
          formData.append(key, value as string);
        }
      }
    });
    return formData;
  }

  /**
   * Valida que la configuración sea correcta
   */
  validateConfig(): boolean {
    return !!(
      this.config.secretKey &&
      this.config.comercio &&
      this.config.callbackSuccess &&
      this.config.callbackCancel &&
      this.config.callbackPending &&
      this.config.gatewayUrl
    );
  }

  /**
   * Obtiene la URL del gateway
   */
  getGatewayUrl(): string {
    return this.config.gatewayUrl;
  }
}

// Instancia singleton del servicio
let plusPagosServiceInstance: PlusPagosService | null = null;

export const getPlusPagosService = (): PlusPagosService => {
  if (!plusPagosServiceInstance) {
    const secretKey = import.meta.env.VITE_PLUSPAGOS_SECRET_KEY;
    const comercio = import.meta.env.VITE_PLUSPAGOS_COMERCIO;
    const callbackSuccess = import.meta.env.VITE_PLUSPAGOS_CALLBACK_SUCCESS;
    const callbackCancel = import.meta.env.VITE_PLUSPAGOS_CALLBACK_CANCEL;
    const callbackPending = import.meta.env.VITE_PLUSPAGOS_CALLBACK_PENDING;
    const gatewayUrl = import.meta.env.VITE_PLUSPAGOS_GATEWAY_URL;

    if (!secretKey || !comercio || !callbackSuccess || !callbackCancel || !callbackPending || !gatewayUrl) {
      throw new Error("Faltan variables de entorno de PlusPagos");
    }

    plusPagosServiceInstance = new PlusPagosService({
      secretKey,
      comercio,
      callbackSuccess,
      callbackCancel,
      callbackPending,
      gatewayUrl,
    });
  }

  return plusPagosServiceInstance;
};
