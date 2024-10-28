import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { memberService } from "@/service/memberService";
import { isAxiosError } from "axios";
import useAuthStore from "@/store/auth";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Footer from "@/components/custom/footer";

import { AlertCircle, User } from "lucide-react";

import { Member } from "@/types";

function Dashboard() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const members = useAuthStore((state) => state.members);
  const addMembers = useAuthStore((state) => state.addMembers);
  const loggedOut = useAuthStore((state) => state.loggedOut);

  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        if (!members || members.length === 0) {
          const response = await memberService.fetchMemberData(accessToken!);

          addMembers({ members: response });
          setErrorMsg("");
        }
      } catch (error) {
        if (isAxiosError(error)) {
          setErrorMsg(
            error?.response?.data?.errorMessage ??
              "Se produjo un error inesperado, intente iniciar sesión nuevamente."
          );
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
    <div className="max-w-md w-full mx-auto p-4 bg-white">
      <h1 className="font-body font-bold text-xl text-black mb-2">¡Hola!</h1>
      <p className="text-Inter text-lg text-black mb-5">
        Selecciona alguno de tus asociados para poder ver su informaci&oacute;n:
      </p>

      <ul className="grid gap-3">
        {members.map((member: Member) => (
          <li key={member.socioUId}>
            <Link
              to={`/dashboard/${member.socioNumeroSocio}`}
              className="h-auto grid grid-cols-[60px_1fr_1fr] grid-rows-2 gap-2 p-2 border border-cec_primaryDark rounded-md shadow-sm hover:bg-slate-200"
            >
              <figure className="row-span-2 inline-flex items-center justify-center">
                <User className="w-14 h-14 p-2 rounded-full bg-cec_primaryDarker stroke-cec_secondaryDark" />
              </figure>
              <span className="font-body font-medium text-lg text-black pt-1 col-span-2 leading-tight">
                {member.socioName.trim()}
              </span>
              <span className="text-Inter text-lg text-black -mt-1 leading-snug">
                <strong className="underline">DNI</strong>: {member.socioDni}
              </span>
              <span className="text-Inter text-lg text-black -mt-1 leading-snug">
                <strong className="underline">Socio</strong>:{" "}
                {member.socioNumeroSocio}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {!!errorMsg && (
        <Alert className="col-span-2 mt-2" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Tuvimos un problema.</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      <Footer />

      <Button
        type="submit"
        className="flex items-center gap-x-2 font-body text-base text-white rounded-md mt-6 bg-cec_primary"
        onClick={() => loggedOut()}
      >
        Cerrar sesi&oacute;n
      </Button>
    </div>
  );
}

export default Dashboard;
