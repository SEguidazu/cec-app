import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import QRCode from "react-qr-code";

import { Member } from "@/types";

import { QrCode as QrCodeIcon } from "lucide-react";

interface QrButtonProps {
  member: Member | null;
}

function QrButton({ member }: QrButtonProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="flex items-center gap-x-3 rounded-lg bg-cec_primary mx-auto col-span-2 text-base font-body font-bold"
          >
            Generar QR
            <QrCodeIcon className="w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Control de acceso al club</DialogTitle>
            <DialogDescription className="text-xl font-semibold text-center mt-2">
              {member?.socioName.trim() ?? "NOMBRE DEL SOCIO"}
            </DialogDescription>
          </DialogHeader>
          <figure className="w-fit inline-flex justify-center items-center mx-auto p-2 border border-cec_primaryDarker rounded-md">
            <QRCode
              value={member?.socioNumeroSocio.toString() ?? ""}
              size={256}
              bgColor="#ffffff"
              fgColor="#0F1F30"
              level="Q"
            />
          </figure>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QrButton;
