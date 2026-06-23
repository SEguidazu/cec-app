import { Link } from "react-router-dom";
import useAuthStore, { useCurrentMember } from "@/store/auth";

import {
  Badge,
  CreditCard,
  FileText,
  QrCodeIcon,
  Trophy,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QrButton from "@/components/custom/QrButton";

function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const currentMember = useCurrentMember();

  const quickLinks = [
    {
      label: "Mi Plan",
      icon: Trophy,
      to: "/plan",
      color: "bg-cec_secondaryDark",
    },
    {
      label: "Cuotas",
      icon: CreditCard,
      to: "/cuotas",
      color: "bg-cec_secondaryDark",
    },
    {
      label: "Familia",
      icon: Users,
      to: "/familia",
      color: "bg-cec_secondaryDark",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          ¡Hola, <span className="text-cec_secondaryDark">{user?.name}</span>!
        </h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido al portal de socios del CEC Liceo Militar
        </p>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QrButton member={currentMember}>
            <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-cec_primaryDarker flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <QrCodeIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  QR Acceso
                </span>
              </CardContent>
            </Card>
          </QrButton>
          {quickLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="flex flex-col items-center justify-center py-6 gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <link.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {link.label}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estado de Cuota
            </CardTitle>
            <CreditCard className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{currentMember?.situacion}</p>
            {/* {cuotaPendiente ? (
              <>
                <p className="text-2xl font-bold">
                  ${cuotaPendiente.monto.toLocaleString()}
                </p>
                <Badge className="mt-1 bg-warning text-warning-foreground">
                  Pendiente — {cuotaPendiente.mes}
                </Badge>
              </>
            ) : (
              <Badge className="bg-success text-success-foreground">
                Al día
              </Badge>
            )} */}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Plan Actual
            </CardTitle>
            <Trophy className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {currentMember?.categoriaSocio}
            </p>
            {/* <p className="text-sm text-muted-foreground mt-1">
              ${planActual?.precio.toLocaleString()}/mes
            </p> */}
          </CardContent>
        </Card>

        {/* <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próxima Actividad
            </CardTitle>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Sábado 19</p>
            <p className="text-sm text-muted-foreground mt-1">
              Torneo Rugby — 10:00 hs
            </p>
          </CardContent>
        </Card> */}
      </div>

      {/* Socio info */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="w-5 h-5 text-accent" /> Datos del Socio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Nº Socio</span>
              <p className="font-semibold">{currentMember?.socioNumeroSocio}</p>
            </div>
            <div>
              <span className="text-muted-foreground">DNI</span>
              <p className="font-semibold">{currentMember?.socioDni}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Categoría</span>
              <p className="font-semibold">{currentMember?.categoriaSocio}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Situación</span>
              <Badge className="bg-success text-success-foreground mt-1">
                {currentMember?.situacion}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
