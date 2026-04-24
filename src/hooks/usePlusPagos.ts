import { useState } from "react";
import { getPlusPagosService } from "@/services/pluspagos";
import type { PlusPagosPaymentParams, PlusPagosEncryptedData } from "@/types/pluspagos";

export function usePlusPagos() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [encryptedData, setEncryptedData] = useState<PlusPagosEncryptedData | null>(null);

  /**
   * Prepara los datos encriptados para el pago
   */
  const preparePayment = async (params: PlusPagosPaymentParams): Promise<PlusPagosEncryptedData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const service = getPlusPagosService();

      if (!service.validateConfig()) {
        throw new Error("Configuración de PlusPagos inválida");
      }

      const data = service.encryptPaymentData(params);
      console.log({ data })
      setEncryptedData(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al preparar el pago";
      setError(errorMessage);
      console.error("PlusPagos error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Inicia el proceso de pago (redirección al gateway)
   */
  const initiatePayment = async (params: PlusPagosPaymentParams): Promise<boolean> => {
    const data = await preparePayment(params);

    if (!data) {
      return false;
    }

    // Aquí iría la lógica de redirección al gateway de PlusPagos
    // Por ahora solo logueamos los datos encriptados
    console.log("Datos encriptados para pago:", data);

    return true;
  };

  return {
    isLoading,
    error,
    encryptedData,
    preparePayment,
    initiatePayment,
  };
}
