import { Link } from "react-router-dom";
import { XCircle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentCancel = () => {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md shadow-lg"
        role="status"
        aria-live="polite"
      >
        <CardContent className="p-8 text-center space-y-6">
          <div
            className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center"
            aria-hidden="true"
          >
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Pago cancelado
            </h1>
            <p className="text-muted-foreground">
              Cancelaste el proceso de pago. No se realizó ningún cargo a tu
              medio de pago.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <p className="text-sm text-foreground">
              Si tuviste algún problema, podés volver a intentarlo o contactarte
              con el club para recibir ayuda.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-cec_primaryDark/40"
            >
              <Link to="/">
                <Home aria-hidden="true" className="mr-1" />
                <span>Ir al inicio</span>
              </Link>
            </Button>
            <Button
              asChild
              className="flex-1 bg-cec_primaryDark text-white hover:bg-cec_primaryDark/80"
            >
              <Link to="/cuotas">
                <RefreshCw aria-hidden="true" className="mr-1" />
                <span>Reintentar pago</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentCancel;
