import { useState } from "react";
import { getPlusPagosService } from "@/services/pluspagos";
import type { PlusPagosPaymentParams } from "@/types/pluspagos";

export function usePlusPagos() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Inicia el proceso de pago mediante POST al gateway de Click de Pago
   */
  const initiatePayment = async (params: PlusPagosPaymentParams): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const service = getPlusPagosService();

      if (!service.validateConfig()) {
        throw new Error("Configuración de PlusPagos inválida");
      }

      // Generar FormData con los datos encriptados y planos
      const formData = service.generatePostData(params);
      const gatewayUrl = service.getGatewayUrl();

      // Crear formulario dinámico para realizar el POST y redirigir al usuario
      const form = document.createElement("form");
      form.method = "POST";
      form.action = gatewayUrl;
      form.style.display = "none";

      // Agregar todos los campos del FormData al formulario como inputs hidden
      formData.forEach((value, key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      // Agregar el formulario al documento y enviarlo
      document.body.appendChild(form);
      form.submit();

      // Aunque el navegador redirigirá, es buena práctica limpiar el DOM
      // si por alguna razón la navegación no fuera inmediata
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 500);

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al iniciar el pago";
      setError(errorMessage);
      console.error("PlusPagos error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    initiatePayment,
  };
}
