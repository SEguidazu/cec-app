import { Check } from "lucide-react";
import { mockPlanes } from "@/mock/common_mocks";
import type { StepElegirMembresiaProps } from "../types";

export function StepElegirMembresia({
  selectedPlan,
  onSelectPlan,
}: StepElegirMembresiaProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {mockPlanes.map((plan) => (
        <button
          key={plan.id}
          type="button"
          onClick={() => onSelectPlan(plan.id)}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            selectedPlan === plan.id
              ? "border-cec_primaryDark bg-accent/5"
              : "border-border hover:border-cec_primaryDark/50"
          }`}
        >
          <h3 className="font-bold text-foreground">{plan.nombre}</h3>
          <p className="text-2xl font-bold text-foreground mt-1">
            ${plan.precio.toLocaleString()}
            <span className="text-sm text-muted-foreground font-normal">
              /mes
            </span>
          </p>
          <ul className="mt-3 space-y-1">
            {plan.beneficios.slice(0, 3).map((b) => (
              <li
                key={b}
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-success" />
                {b}
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
}
