import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { usePlusPagos } from "@/hooks/usePlusPagos";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowLeft, ArrowRight, Badge, Check } from "lucide-react";
import EscudoCEC from "@/assets/images/cec.svg";

import { mockPlanes } from "@/mock/common_mocks";
import { COUNTRIES_BY_SUBREGION } from "@/pages/registro/countries";
import { personalSchema } from "./schemas";

const steps = ["Datos personales", "Elegir membresía", "Método de pago"];

function Registro() {
  const [step, setStep] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const { toast } = useToast();
  const { isLoading: isPaymentLoading, initiatePayment, error: paymentError } = usePlusPagos();

  const form = useForm<z.infer<typeof personalSchema>>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      dni: undefined,
      birthDate: undefined,
      email: "",
      phone: undefined,
      address: "",
      city: "",
      country: "",
      preferredContact: "phone",
    },
  });

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
      // Iniciar proceso de pago con PlusPagos
      const selectedPlanData = mockPlanes.find((p) => p.id === selectedPlan);
      if (selectedPlanData) {
        const success = await initiatePayment({
          monto: selectedPlanData.precio,
        });
        if (success) {
          handleFinish();
        } else {
          toast({
            title: "Error al procesar el pago",
            description: paymentError || "Ocurrió un error al iniciar el proceso de pago",
            variant: "destructive",
          });
        }
      }
      return;
    }
    setStep(step + 1);
  }

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
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-xs sm:inline ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {s}
                  </span>
                </div>
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
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          Nombre <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Carlos"
                            {...field}
                            aria-required="true"
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                            className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                          />
                        </FormControl>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          Apellido <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="González"
                            {...field}
                            aria-required="true"
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                            className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                          />
                        </FormControl>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dni"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          DNI <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="11222333"
                            {...field}
                            aria-required="true"
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                            className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                          />
                        </FormControl>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          Fecha de nacimiento{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                            aria-required="true"
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                            className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                          />
                        </FormControl>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          Teléfono <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="+54 11 5555-1234"
                            {...field}
                            aria-required="true"
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                            className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                          />
                        </FormControl>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          Email <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@ejemplo.com"
                            {...field}
                            aria-required="true"
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                            className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                          />
                        </FormControl>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          Dirección <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Calle 123"
                            {...field}
                            aria-required="true"
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                            className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                          />
                        </FormControl>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          Ciudad <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Buenos Aires"
                            {...field}
                            aria-required="true"
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                            className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                          />
                        </FormControl>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          País <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              aria-required="true"
                              aria-invalid={fieldState.invalid}
                              aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                              className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                            >
                              <SelectValue placeholder="Selecciona un país" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES_BY_SUBREGION.map((group) => (
                              <SelectGroup key={group.subregion}>
                                <SelectLabel>{group.subregion}</SelectLabel>
                                {group.countries.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredContact"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>
                          Contacto preferido{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              aria-required="true"
                              aria-invalid={fieldState.invalid}
                              aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                              className={fieldState.invalid ? "border-destructive" : fieldState.isDirty && !fieldState.invalid ? "border-success" : ""}
                            >
                              <SelectValue placeholder="Selecciona un método" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="phone">Teléfono</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage id={`${field.name}-error`} />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          )}
          {step === 1 && (
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
          {step === 2 && (
            <div className="space-y-4 text-center py-8">
              <Badge className="bg-accent text-accent-foreground text-sm px-4 py-1">
                Procesando pago con PlusPagos
              </Badge>
              <p className="text-muted-foreground">
                Al confirmar, se iniciará el proceso de pago seguro con Click de Pago Tecnologia Macro.
              </p>
              {selectedPlan && (
                <div className="border rounded-lg p-6 max-w-sm mx-auto space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Plan seleccionado:</span>
                    <span className="font-bold">
                      {mockPlanes.find((p) => p.id === selectedPlan)?.nombre}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monto a pagar:</span>
                    <span className="font-bold text-lg">
                      ${mockPlanes.find((p) => p.id === selectedPlan)?.precio.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
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
