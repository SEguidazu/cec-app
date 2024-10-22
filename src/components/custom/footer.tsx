import { Phone, Mail } from "lucide-react";
import LiceoMilitarCEC from "@/assets/images/cec-liceo-militar.png";
import { cn } from "@/lib/utils";

interface Props {
  isContained?: boolean;
}

function Footer({ isContained = false }: Props) {

  return (
    <footer className="flex flex-col justify-center items-center gap-y-4 mt-6">
      <div className={cn(
        isContained ? 'max-w-72 px-3 p-5' : 'py-2',
        'w-full mb-2 rounded-lg bg-white')}>
        <h2 className="font-body font-bold text-md text-black mb-2">
          Medios de Contacto
        </h2>

        <ul>
          <li>
            <a className="inline-flex flex-row items-start justify-center text-sm gap-x-2 leading-6" href="tel:39820217">
              <Phone color="#0A4C7D" />
              3982-0217
            </a>
          </li>
          <li>
            <a className="inline-flex flex-row items-start justify-center text-sm gap-x-2 leading-6" href="mailto:consultassocios@yahoo.com.ar">
              <Mail color="#0A4C7D" />
              consultassocios@yahoo.com.ar
            </a>
          </li>
          <li>
            <a className="inline-flex flex-row items-start justify-center text-sm gap-x-2 leading-6" href="mailto:secretariacecliceomilitargsm@yahoo.com.ar">
              <Mail color="#0A4C7D" />
              secretariacecliceomilitargsm<br />@yahoo.com.ar
            </a>
          </li>
        </ul>
      </div>

      {isContained && (
        <img src={LiceoMilitarCEC} alt="" className="max-w-40	mx-auto mb-4" />
      )}
    </footer>
  )
}

export default Footer

