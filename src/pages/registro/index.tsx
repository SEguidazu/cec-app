import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import EscudoCEC from "@/assets/images/cec.svg";

import { useRegistroWizard, REGISTRO_STEPS } from "./useRegistroWizard";
import { RegistroStepper } from "./components/RegistroStepper";
import { StepDatosPersonales } from "./components/StepDatosPersonales";
import { StepElegirMembresia } from "./components/StepElegirMembresia";
import { StepMetodoPago } from "./components/StepMetodoPago";

function Registro() {
  const {
    step,
    selectedPlan,
    setSelectedPlan,
    form,
    isPaymentLoading,
    handleNextStep,
    handlePrevStep,
  } = useRegistroWizard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg border-0 shadow-primary/5">
        <CardHeader className="text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
            <img
              src={EscudoCEC}
              alt=""
              className="max-w-32 mx-auto"
              aria-hidden
            />
          </div>
          <CardTitle className="text-2xl text-primary">
            Registro de Nuevo Socio
          </CardTitle>
          <RegistroStepper steps={REGISTRO_STEPS} currentStep={step} />
        </CardHeader>

        <CardContent>
          {step === 0 && <StepDatosPersonales form={form} />}
          {step === 1 && (
            <StepElegirMembresia
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
            />
          )}
          {step === 2 && <StepMetodoPago selectedPlan={selectedPlan} />}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Anterior
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Volver
                </Button>
              </Link>
            )}

            {step < 2 ? (
              <Button
                onClick={handleNextStep}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Siguiente <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleNextStep}
                disabled={isPaymentLoading}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isPaymentLoading ? (
                  "Procesando..."
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" /> Confirmar Pago
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Registro;
