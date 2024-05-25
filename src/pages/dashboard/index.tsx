import useAuth from "@/hooks/useAuth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { QrCode } from "lucide-react";

import EscudoCEC from "@/assets/images/cec-escudo.png";

function Dashboard() {
  const { auth } = useAuth();

  console.log("Auth: ", auth);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <figure className="rounded-full bg-cec_primary p-2 mb-8">
        <img
          src={EscudoCEC}
          alt=""
          className="max-w-28	mx-auto rounded-full overflow-hidden"
        />
      </figure>

      <section
        id="user-data"
        className="max-w-80 w-full grid grid-cols-[auto,1fr] gap-3 items-center p-4 rounded-lg shadow-lg bg-white"
      >
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="firstname"
          type="text"
          value="Bautista"
          disabled
          className="text-base text-white bg-cec_primary disabled:opacity-90"
        />

        <Label htmlFor="lastname">Apellido</Label>
        <Input
          id="lastname"
          type="text"
          disabled
          className="text-base text-white bg-cec_primary disabled:opacity-90"
        />

        <Label htmlFor="dni">DNI</Label>
        <Input
          id="dni"
          type="number"
          disabled
          className="text-base text-white bg-cec_primary disabled:opacity-90"
        />

        <Label htmlFor="memberType">Cat. Socio</Label>
        <Input
          id="memberType"
          type="text"
          disabled
          className="text-base text-white bg-cec_primary disabled:opacity-90"
        />

        <Label htmlFor="activity">Actividad</Label>
        <Input
          id="activity"
          type="text"
          disabled
          className="text-base text-white bg-cec_primary disabled:opacity-90"
        />

        <Label htmlFor="category">División</Label>
        <Input
          id="category"
          type="text"
          disabled
          className="text-base text-white bg-cec_primary disabled:opacity-90"
        />

        <Label htmlFor="memberSituation">Sit. Socio</Label>
        <Input
          id="memberSituation"
          type="text"
          disabled
          className="text-base text-white bg-cec_primary disabled:opacity-90"
        />
      </section>

      <Button
        size="lg"
        className="flex items-center gap-x-3 text-lg rounded-lg bg-cec_primary mt-5 mx-auto"
      >
        Generar QR
        <QrCode className="w-6" />
      </Button>
    </div>
  );
}

export default Dashboard;
