import { Check } from "lucide-react";
import type { RegistroStepperProps } from "../types";

export function RegistroStepper({ steps, currentStep }: RegistroStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= currentStep
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-xs sm:inline ${
                i <= currentStep
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 ${i < currentStep ? "bg-accent" : "bg-muted"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
