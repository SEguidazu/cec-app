import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, Instagram } from "lucide-react";
import { useToast } from "@/hooks/useToast";

function Contacto() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Contacto</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info */}
        <div className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Información del Club</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Phone, label: "Teléfono", value: "3982-0217" },
                {
                  icon: Mail,
                  label: "Email",
                  value: "consultassocios@yahoo.com.ar",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  value: "@cecliceomilitar",
                },
                {
                  icon: MapPin,
                  label: "Dirección",
                  value: "Av. Bernabé Márquez 6156, Loma Hermosa, Buenos Aires",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Envianos tu consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast({
                  title: "Consulta enviada",
                  description: "Nos pondremos en contacto pronto.",
                });
              }}
            >
              <div className="space-y-2">
                <Label>Asunto</Label>
                <Input placeholder="Ej: Consulta sobre actividades" />
              </div>
              <div className="space-y-2">
                <Label>Mensaje</Label>
                <Textarea placeholder="Escribí tu consulta..." rows={5} />
              </div>
              <Button
                type="submit"
                className="w-full bg-cec_secondaryDark text-white hover:bg-cec_secondaryDark/90"
              >
                <Send className="w-4 h-4 mr-2" /> Enviar Consulta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Contacto;
