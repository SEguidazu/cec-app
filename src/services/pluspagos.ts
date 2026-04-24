import AESEncrypter from "pluspagos-aes-encryption";
import type {
  PlusPagosConfig,
  PlusPagosEncryptedData,
  PlusPagosPaymentParams,
} from "@/types/pluspagos";

export class PlusPagosService {
  private secretKey: string;
  private callbackSuccess: string;
  private callbackCancel: string;

  constructor(
    config: Pick<
      PlusPagosConfig,
      "secretKey" | "callbackSuccess" | "callbackCancel"
    >,
  ) {
    this.secretKey = config.secretKey;
    this.callbackSuccess = config.callbackSuccess;
    this.callbackCancel = config.callbackCancel;
  }

  /**
   * Encripta los datos necesarios para el pago con PlusPagos
   */
  encryptPaymentData(params: PlusPagosPaymentParams): PlusPagosEncryptedData {
    const { monto, sucursalComercio = "" } = params;

    return {
      callbackSuccess: AESEncrypter.encryptString(
        this.callbackSuccess,
        this.secretKey,
      ),
      callbackCancel: AESEncrypter.encryptString(
        this.callbackCancel,
        this.secretKey,
      ),
      sucursalComercio: AESEncrypter.encryptString(
        sucursalComercio,
        this.secretKey,
      ),
      monto: AESEncrypter.encryptString(monto.toString(), this.secretKey),
    };
  }

  /**
   * Valida que la configuración sea correcta
   */
  validateConfig(): boolean {
    return !!(this.secretKey && this.callbackSuccess && this.callbackCancel);
  }
}

// Instancia singleton del servicio
let plusPagosServiceInstance: PlusPagosService | null = null;

export const getPlusPagosService = (): PlusPagosService => {
  if (!plusPagosServiceInstance) {
    const secretKey = import.meta.env.VITE_PLUSPAGOS_SECRET_KEY;
    const callbackSuccess = import.meta.env.VITE_PLUSPAGOS_CALLBACK_SUCCESS;
    const callbackCancel = import.meta.env.VITE_PLUSPAGOS_CALLBACK_CANCEL;

    if (!secretKey || !callbackSuccess || !callbackCancel) {
      throw new Error("Faltan variables de entorno de PlusPagos");
    }

    plusPagosServiceInstance = new PlusPagosService({
      secretKey,
      callbackSuccess,
      callbackCancel,
    });
  }

  return plusPagosServiceInstance;
};
