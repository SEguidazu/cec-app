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
   * Los nombres son Producto[n] y MontoProducto[n] según el manual (sección 3.3)
   */
  private generateProductFields(
    productos?: Array<{ descripcion: string; monto?: number }>,
  ): Record<string, string> {
    const fields: Record<string, string> = {};

    if (!productos || productos.length === 0) return fields;

    productos.forEach((prod, index) => {
      fields[`Producto[${index}]`] = prod.descripcion;
      if (prod.monto !== undefined) {
        fields[`MontoProducto[${index}]`] = this.transformAmount(
          prod.monto,
        ).toString();
      }
    });

    return fields;
  }

  /**
   * Encripta un valor usando la SecretKey
   */
  private encryptValue(value: string): string {
    return window.AESEncrypter.encryptString(value, this.config.secretKey);
  }

  /**
   * Genera el FormData completo para el POST al gateway
   * Nombres de campos según manual sección 3.3 (capitalización exacta)
   */
  generatePostData(params: PlusPagosPaymentParams): FormData {
    const montoTransformado = this.transformAmount(params.monto);

    const formData = new FormData();

    // --- Campos encriptados (SÍ en columna Encriptado del manual) ---
    formData.append(
      "CallbackSuccess",
      this.encryptValue(this.config.callbackSuccess),
    );
    formData.append(
      "CallbackCancel",
      this.encryptValue(this.config.callbackCancel),
    );
    formData.append("Monto", this.encryptValue(montoTransformado.toString()));

    // SucursalComercio: SIEMPRE se envía encriptado, incluso si es string vacío
    formData.append(
      "SucursalComercio",
      this.encryptValue(params.sucursalComercio ?? ""),
    );

    // CallbackPending: opcional, solo se envía si hay URL
    if (this.config.callbackPending) {
      formData.append(
        "CallbackPending",
        this.encryptValue(this.config.callbackPending),
      );
    }

    // Informacion: opcional, solo si se envía
    if (params.informacion) {
      formData.append("Informacion", this.encryptValue(params.informacion));
    }

    // UserId: opcional, solo para tarjetero
    if (params.userId) {
      formData.append("UserId", this.encryptValue(params.userId));
    }

    // --- Campos NO encriptados ---
    formData.append("Comercio", this.config.comercio);
    formData.append("TransaccionComercioId", params.transaccionComercioId);

    // Productos y montos de productos
    const productFields = this.generateProductFields(params.productos);
    Object.entries(productFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // ClientData (opcionales)
    if (params.clientData?.cuit) {
      formData.append("ClientData.CUIT", params.clientData.cuit);
    }
    if (params.clientData?.nombreApellido) {
      formData.append(
        "ClientData.NombreApellido",
        params.clientData.nombreApellido,
      );
    }

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

    if (
      !secretKey ||
      !comercio ||
      !callbackSuccess ||
      !callbackCancel ||
      !gatewayUrl
    ) {
      throw new Error("Faltan variables de entorno de PlusPagos");
    }

    plusPagosServiceInstance = new PlusPagosService({
      secretKey,
      comercio,
      callbackSuccess,
      callbackCancel,
      callbackPending, // opcional
      gatewayUrl,
    });
  }

  return plusPagosServiceInstance;
};
