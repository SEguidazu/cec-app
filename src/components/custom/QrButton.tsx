import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import QRCode from "react-qr-code";

import { Member } from "@/types";

import { QrCode as QrCodeIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface QrButtonProps {
  member: Member | null;
  children: React.ReactNode;
}

function QrButton({ member, children }: QrButtonProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
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
