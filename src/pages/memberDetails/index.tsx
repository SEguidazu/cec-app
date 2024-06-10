import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { QrCode, MoveLeft } from "lucide-react";

import BuffetCEC from "@/assets/images/buffet-blur-background.png";
import EscudoCEC from "@/assets/images/cec-escudo.png";
import { Member } from "@/types";

function MemberDetails() {
  const { auth: { members } } = useAuth()
  const { memberId } = useParams()

  const [memberDetails, setMemberDetails] = useState<Member | null>(null)

  useEffect(() => {
    const memberSelected = members.find((member: Member) => member.socioNumeroSocio === Number(memberId)) ?? null

    setMemberDetails(memberSelected)
  }, [members, memberId])

  return (
    <div>
      <img
        src={BuffetCEC}
        alt=""
        className="w-full max-h-36 object-cover"
      />

      <figure className="max-w-32 w-full rounded-full bg-cec_primaryDarker p-1 z-10">
        <img
          src={EscudoCEC}
          alt=""
          className="w-full rounded-full overflow-hidden"
        />
      </figure>

      <section
        id="member-details"
        className="max-w-80 w-full grid grid-cols-1 gap-2 items-center p-4 rounded-lg shadow-lg bg-white"
      >
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="firstname"
          type="text"
          value={memberDetails?.socioName.trim()}
          disabled
          className="text-base text-white bg-cec_primaryDarker mb-1 disabled:opacity-90"
        />

        <Label htmlFor="dni">DNI</Label>
        <Input
          id="dni"
          type="number"
          value={memberDetails?.socioDni}
          disabled
          className="text-base text-white bg-cec_primaryDarker mb-1 disabled:opacity-90"
        />

        <Label htmlFor="memberType">Cat. Socio</Label>
        <Input
          id="memberType"
          type="text"
          value={memberDetails?.categoriaSocio.trim()}
          disabled
          className="text-base text-white bg-cec_primaryDarker mb-1 disabled:opacity-90"
        />

        <Label htmlFor="activity">Actividad</Label>
        <Input
          id="activity"
          type="text"
          value={memberDetails?.actividad.trim()}
          disabled
          className="text-base text-white bg-cec_primaryDarker mb-1 disabled:opacity-90"
        />

        <Label htmlFor="memberSituation">Sit. Socio</Label>
        <Input
          id="memberSituation"
          type="text"
          value={memberDetails?.situacion.trim()}
          disabled
          className="text-base text-white bg-cec_primaryDarker mb-1 disabled:opacity-90"
        />

        <Link to='/dashboard' className='inline-flex justify-center items-center gap-x-3 mt-2 text-base font-medium py-1 px-2 rounded-lg border border-cec_primaryDark'>
          <MoveLeft className='w-4' />
          Ir atrás
        </Link>
      </section>

      <Button
        size="lg"
        className="flex items-center gap-x-3 text-lg rounded-lg bg-cec_primary mt-5 mx-auto"
      >
        Generar QR
        <QrCode className="w-6" />
      </Button>
    </div>
  )
}

export default MemberDetails