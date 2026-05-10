import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/useToast";
import { usePlusPagos } from "@/hooks/usePlusPagos";
import { mockPlanes } from "@/mock/common_mocks";

import { personalSchema } from "./schemas";
import type { PersonalFormData, RegistroStep } from "./types";

export const REGISTRO_STEPS = [
  "Datos personales",
  "Elegir membresía",
  "Método de pago",
] as const;

export interface UseRegistroWizardReturn {
  step: RegistroStep;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
  form: ReturnType<typeof useForm<PersonalFormData>>;
  isPaymentLoading: boolean;
  handleNextStep: () => Promise<void>;
  handlePrevStep: () => void;
}

export function useRegistroWizard(): UseRegistroWizardReturn {
  const [step, setStep] = useState<RegistroStep>(0);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const { toast } = useToast();
  const {
    isLoading: isPaymentLoading,
    initiatePayment,
    error: paymentError,
  } = usePlusPagos();

  const form = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      dni: undefined,
      birthDate: undefined,
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      preferredContact: "phone",
    },
  });

  function handlePrevStep(): void {
    if (step > 0) {
      setStep((s) => (s - 1) as RegistroStep);
    }
  }

  async function handleNextStep(): Promise<void> {
    if (step === 0) {
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: "Por favor completa los campos requeridos",
          description: "Verifica los errores en el formulario",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 1 && !selectedPlan) {
      toast({
        title: "Selecciona un plan",
        description: "Debes seleccionar una membresía para continuar",
        variant: "destructive",
      });
      return;
    }

    if (step === 2) {
      const selectedPlanData = mockPlanes.find((p) => p.id === selectedPlan);
      if (selectedPlanData) {
        const formData = form.getValues();
        const transaccionId = `REG-${Date.now()}-${formData.dni}`;

        const success = await initiatePayment({
          monto: selectedPlanData.precio,
          transaccionComercioId: transaccionId,
          productos: [
            {
              descripcion: selectedPlanData.nombre,
              monto: selectedPlanData.precio,
            },
          ],
          clientData: {
            nombreApellido: `${formData.firstName} ${formData.lastName}`,
          },
        });

        if (success) {
          toast({
            title: "Registro exitoso!",
            description: "Se ha registrado con éxito",
          });
        } else {
          toast({
            title: "Error al procesar el pago",
            description:
              paymentError || "Ocurrió un error al iniciar el proceso de pago",
            variant: "destructive",
          });
        }
      }
      return;
    }

    setStep((s) => (s + 1) as RegistroStep);
  }

  return {
    step,
    selectedPlan,
    setSelectedPlan,
    form,
    isPaymentLoading,
    handleNextStep,
    handlePrevStep,
  };
}
