import { Link } from "react-router-dom";
import { Clock, Home, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentPending = () => {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md shadow-lg"
        role="status"
        aria-live="polite"
      >
        <CardContent className="p-8 text-center space-y-6">
          <div
            className="mx-auto w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center"
            aria-hidden="true"
          >
            <Clock className="w-12 h-12 text-warning" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Pago pendiente de acreditación
            </h1>
            <p className="text-muted-foreground">
              Tu solicitud de pago con Débito fue generada correctamente.
              Estamos esperando la confirmación de tu banco para acreditar el
              pago.
            </p>
          </div>
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 text-left space-y-2">
            <p className="text-sm font-medium text-foreground">¿Qué sigue?</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Revisá la app de tu banco y aceptá la solicitud DEBIN.</li>
              <li>Te notificaremos por email cuando el pago se acredite.</li>
              <li>Podés ver el estado actualizado en la sección Cuotas.</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-cec_primaryDark/40"
            >
              <Link to="/cuotas">
                <CreditCard aria-hidden="true" className="mr-1" />
                <span>Ver cuotas</span>
              </Link>
            </Button>
            <Button
              asChild
              className="flex-1 bg-cec_primaryDark text-white hover:bg-cec_primaryDark/80"
            >
              <Link to="/">
                <Home aria-hidden="true" className="mr-1" />
                <span>Ir al inicio</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentPending;
