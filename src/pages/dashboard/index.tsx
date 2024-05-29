import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { memberService } from "@/service/memberService";
import { isAxiosError } from "axios";
import useAuth from "@/hooks/useAuth";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AlertCircle } from "lucide-react";
import EscudoCEC from "@/assets/images/cec-escudo.png";

import { Member } from "@/types";

function Dashboard() {
  const { auth: { accessToken, members }, setAuth
  } = useAuth();

  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await memberService.fetchMemberData(accessToken!);

        setAuth({ members: response });
      } catch (error) {
        if (isAxiosError(error)) {
          setErrorMsg(error?.response?.data?.errorMessage);
        } else {
          setErrorMsg(
            "Se produjo un error inesperado, intente nuevamente más tarde."
          );
        }
      }
    };

    fetchMemberData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img
        src={EscudoCEC}
        alt="Círculo de Ex Cadetes del Liceo Militar Genral San Martín"
        className="max-w-32	mx-auto mb-8"
      />

      <section
        id="user-data"
        className="max-w-80 w-full grid grid-cols-1 gap-3 items-center p-4 rounded-lg shadow-lg bg-white"
      >
        <h2 className="text-base font-medium mb-2">Seleccione un socio para ver su detalle:</h2>

        <ul className="text-center grid gap-3">
          {members.map((member: Member) => (
            <li key={member.socioUId}>
              <Link to={`/dashboard/${member.socioNumeroSocio}`} className='block text-lg text-white py-2 px-1 rounded-lg bg-cec_primary'>{member.socioName.trim()}</Link>
            </li>
          ))}
        </ul>

        {!!errorMsg && (
          <Alert className="col-span-2 mt-2" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tuvimos un problema!</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
