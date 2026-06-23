import QrButton from "@/components/custom/QrButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { useCurrentMember } from "@/store/auth";
import { Badge, QrCode, Save, User } from "lucide-react";

function Profile() {
  const currentMember = useCurrentMember();
  const { toast } = useToast();

  const avatarFallbackText =
    currentMember?.socioName
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "S";
  console.log("Current Member in Profile:", currentMember);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card className="shadow-sm lg:col-span-1">
          <CardContent className="flex flex-col items-center py-8 space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback
                className="bg-primary text-primary-foreground text-2xl font-bold"
                children={avatarFallbackText}
              />
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">
                {currentMember?.socioName}
              </h2>
              <p className="text-sm text-muted-foreground">
                Socio #{currentMember?.socioNumeroSocio}
              </p>
            </div>
            <div className="text-sm text-center space-y-1 text-muted-foreground">
              <p>
                Categoría:{" "}
                <span className="font-medium text-foreground">
                  {currentMember?.categoriaSocio}
                </span>
              </p>
              <p>
                Actividad:{" "}
                <span className="font-medium text-foreground">
                  {currentMember?.actividad}
                </span>
              </p>
              <p>
                Situacion:{" "}
                <span className="font-medium text-accent">
                  {currentMember?.situacion}
                </span>
              </p>
            </div>
            <QrButton member={currentMember}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <QrCode className="w-4 h-4 mr-2" /> Generar QR
              </Button>
            </QrButton>
          </CardContent>
        </Card>

        {/* Editable data */}
        {/* <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-5 h-5 text-accent" /> Datos Personales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input defaultValue={socio?.nombre} />
              </div>
              <div className="space-y-2">
                <Label>Apellido</Label>
                <Input defaultValue={socio?.apellido} />
              </div>
              <div className="space-y-2">
                <Label>DNI</Label>
                <Input
                  defaultValue={socio?.dni}
                  disabled
                  className="opacity-60"
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Nacimiento</Label>
                <Input
                  defaultValue={socio?.fechaNacimiento}
                  disabled
                  className="opacity-60"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={socio?.email} />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input defaultValue={socio?.telefono} />
              </div>
            </div>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() =>
                toast({
                  title: "Datos guardados",
                  description: "Tus datos fueron actualizados correctamente.",
                })
              }
            >
              <Save className="w-4 h-4 mr-2" /> Guardar Cambios
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}

export default Profile;
