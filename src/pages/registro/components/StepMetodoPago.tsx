import { Badge } from "lucide-react";
import { mockPlanes } from "@/mock/common_mocks";
import type { StepMetodoPagoProps } from "../types";

export function StepMetodoPago({ selectedPlan }: StepMetodoPagoProps) {
  const plan = mockPlanes.find((p) => p.id === selectedPlan);

  return (
    <div className="space-y-4 text-center py-8">
      <Badge className="bg-accent text-accent-foreground text-sm px-4 py-1">
        Procesando pago con PlusPagos
      </Badge>
      <p className="text-muted-foreground">
        Al confirmar, se iniciará el proceso de pago seguro con Click de Pago
        Tecnologia Macro.
      </p>
      {plan && (
        <div className="border rounded-lg p-6 max-w-sm mx-auto space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Plan seleccionado:</span>
            <span className="font-bold">{plan.nombre}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Monto a pagar:</span>
            <span className="font-bold text-lg">
              ${plan.precio.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
