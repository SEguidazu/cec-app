import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { personalSchema } from "./schemas";

export type RegistroStep = 0 | 1 | 2;
export type PersonalFormData = z.infer<typeof personalSchema>;

export interface StepDatosPersonalesProps {
  form: UseFormReturn<PersonalFormData>;
}

export interface StepElegirMembresiaProps {
  selectedPlan: string;
  onSelectPlan: (id: string) => void;
}

export interface StepMetodoPagoProps {
  selectedPlan: string;
}

export interface RegistroStepperProps {
  steps: readonly string[];
  currentStep: number;
}
