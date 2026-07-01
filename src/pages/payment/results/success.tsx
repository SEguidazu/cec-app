import { Link } from "react-router-dom";
import { CheckCircle2, Home, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentSuccess = () => {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md shadow-lg"
        role="status"
        aria-live="polite"
      >
        <CardContent className="p-8 text-center space-y-6">
          <div
            className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center"
            aria-hidden="true"
          >
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              ¡Pago realizado con éxito!
            </h1>
            <p className="text-muted-foreground">
              Tu pago fue procesado correctamente. Recibirás un email con el
              comprobante en los próximos minutos.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-left space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Nº de operación
            </p>
            <p className="font-mono text-sm text-foreground">
              OP-2026-{Math.floor(Math.random() * 900000 + 100000)}
            </p>
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

export default PaymentSuccess;
