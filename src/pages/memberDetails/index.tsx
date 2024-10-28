import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthStore from "@/store/auth";

import { ArrowLeft } from "lucide-react";

import EscudoCEC from "@/assets/images/cec.svg";

import { Member } from "@/types";
import QrButton from "@/components/custom/qr-button";

function MemberDetails() {
  const members = useAuthStore((state) => state.members);
  const { memberId } = useParams();

  const [memberDetails, setMemberDetails] = useState<Member | null>(null);

  useEffect(() => {
    const memberSelected =
      members.find(
        (member: Member) => member.socioNumeroSocio === Number(memberId)
      ) ?? null;

    setMemberDetails(memberSelected);
  }, [members, memberId]);

  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white relative">
      <figure className="max-w-32 w-full rounded-full bg-cec_primaryDarker mx-auto -mt-16 p-1 z-10">
        {/* IMAGEN DEL JUGADOR */}
        <img
          src={EscudoCEC}
          alt=""
          className="w-full rounded-full overflow-hidden"
        />
      </figure>

      <section
        id="member-details"
        className="max-w-80 w-full -mt-3 mx-auto p-5 grid grid-cols-2  items-center rounded-md border border-cec_primaryDark shadow-sm"
      >
        <h1 className="font-body font-medium text-xl text-center col-span-2 mb-2">
          {memberDetails?.socioName.trim() ?? "NOMBRE DEL SOCIO"}
        </h1>

        <span className="text-base text-center leading-snug px-1 border-r border-cec_primaryDark">
          <strong className="underline">DNI</strong>:{" "}
          {memberDetails?.socioDni ?? "SIN DATO"}
        </span>

        <span className="text-base text-center leading-snug px-1">
          <strong className="underline">Socio</strong>:{" "}
          {memberDetails?.socioNumeroSocio ?? "SIN DATO"}
        </span>

        <div className="col-span-2 mt-4 mb-4">
          <h2 className="text-base font-bold underline">
            Categor&iacute;a de socio
          </h2>
          <p className="text-xl">
            {memberDetails?.categoriaSocio ?? "SIN DATO"}
          </p>
        </div>

        <div className="col-span-2 mb-4">
          <h2 className="text-base font-bold underline">Actividad</h2>
          <p className="text-xl">{memberDetails?.actividad ?? "SIN DATO"}</p>
        </div>

        <div className="col-span-2 mb-6">
          <h2 className="text-base font-bold underline">
            Situaci&oacute;n del socio
          </h2>
          <p className="text-xl">{memberDetails?.situacion ?? "SIN DATO"}</p>
        </div>

        <div className="col-span-2">
          <QrButton />
        </div>
      </section>

      <div className="max-w-80 w-full mx-auto mt-6">
        <Link
          to="/dashboard"
          className="inline-flex justify-center items-center gap-x-2 mt-2 text-base font-body font-bold py-2 px-4 rounded-lg border border-cec_primaryDark"
        >
          <ArrowLeft className="w-5" />
          Ir atrás
        </Link>
      </div>
    </div>
  );
}

export default MemberDetails;
