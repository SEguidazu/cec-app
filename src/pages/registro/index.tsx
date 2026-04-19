import { useState } from "react";
import { useToast } from "@/hooks/useToast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { ArrowLeft, ArrowRight, Badge, Check, Link } from "lucide-react";
import EscudoCEC from "@/assets/images/cec.svg";

import { mockPlanes } from "@/mock/common_mocks";

const steps = [
  "Datos personales",
  "Domicilio",
  "Elegir membresía",
  "Método de pago",
];

function Registro() {
  const [step, setStep] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const { toast } = useToast();

  function handleFinish(): void {
    console.log("finish");
    toast({
      title: "Registro exitoso!",
      description: "Se ha registrado con exito",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg border-0 shadow-primary/5">
        <CardHeader className="text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
            <img
              src={EscudoCEC}
              alt=""
              className="max-w-32	mx-auto"
              aria-hidden
            />
          </div>
          <CardTitle className="text-2xl text-primary">
            Registro de Nuevo Socio
          </CardTitle>
          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs hidden sm:inline ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${i < step ? "bg-accent" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input placeholder="Carlos" />
                </div>
                <div className="space-y-2">
                  <Label>Apellido</Label>
                  <Input placeholder="González" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Apodo</Label>
                  <Input placeholder="Carlitos" />
                </div>
                <div className="space-y-2">
                  <Label>Fecha de nacimiento</Label>
                  <Input type="date" placeholder="21/07/1996" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>DNI</Label>
                  <Input placeholder="11222333" />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input placeholder="+54 11 5555-1234" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@ejemplo.com" />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Dirección</Label>
                <Input placeholder="Calle Falsa 1234" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Piso</Label>
                  <Input placeholder="Buenos Aires" />
                </div>
                <div className="space-y-2">
                  <Label>Depto</Label>
                  <Input placeholder="Argentina" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ciudad</Label>
                  <Input placeholder="Buenos Aires" />
                </div>
                <div className="space-y-2">
                  <Label>País</Label>
                  <Input placeholder="Argentina" />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockPlanes.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${selectedPlan === plan.id ? "border-cec_primaryDark bg-accent/5" : "border-border hover:border-cec_primaryDark/50"}`}
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
          )}
          {step === 3 && (
            <div className="space-y-4 text-center py-8">
              <Badge className="bg-accent text-accent-foreground text-sm px-4 py-1">
                Pago simulado
              </Badge>
              <p className="text-muted-foreground">
                En una implementación real, aquí se integraría Mercado Pago u
                otro medio de pago.
              </p>
              <div className="border rounded-lg p-6 max-w-sm mx-auto space-y-3">
                <div className="space-y-2">
                  <Label>Número de tarjeta</Label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Vencimiento</Label>
                    <Input placeholder="12/28" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Anterior
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Volver
                </Button>
              </Link>
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Siguiente <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Check className="w-4 h-4 mr-1" /> Confirmar Registro
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Registro;
