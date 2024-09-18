import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { QrCode } from "lucide-react";

import QrExample from "@/assets/images/qr-example.svg";

function QrButton() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="flex items-center gap-x-3 rounded-lg bg-cec_primary mx-auto col-span-2 text-base font-body font-bold"
          >
            Generar QR
            <QrCode className="w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Control de acceso al club</DialogTitle>
            <DialogDescription className="text-xl font-semibold text-center">
              ** PROXIMAMENTE **
            </DialogDescription>
          </DialogHeader>
          <figure className="inline-flex justify-center items-center">
            <img
              src={QrExample}
              alt=""
              className="max-w-52 p-2 border border-cec_primary rounded-md"
            />
          </figure>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QrButton;
