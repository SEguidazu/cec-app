"use client"

import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

function QrButton() {
  return (
    <Button
      size="lg"
      className="flex items-center gap-x-3 rounded-lg bg-cec_primary mx-auto col-span-2 text-base font-body font-bold"
    >
      Generar QR
      <QrCode className="w-6" />
    </Button>
  )
}

export default QrButton