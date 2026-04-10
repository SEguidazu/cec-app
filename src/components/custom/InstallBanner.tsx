import { useState } from "react";
import { X, Share, Plus } from "lucide-react";

interface Props {
  onDismiss?: () => void;
}

function InstallBanner({ onDismiss }: Props) {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  if (!visible) return null;

  return (
    <div
      role="banner"
      aria-label="Instalar aplicación"
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-[#0F1F30] border-t border-white/10
        px-4 pt-4 pb-6
        flex flex-col gap-3
        shadow-[0_-4px_24px_rgba(0,0,0,0.4)]
        animate-[slideUp_0.3s_ease-out]
      "
    >
      {/* Header del banner */}
      <div className="flex items-center justify-between">
        <p className="font-body font-bold text-white text-sm">
          Instalá Socios CEC en tu dispositivo
        </p>
        <button
          id="pwa-ios-dismiss"
          onClick={handleDismiss}
          aria-label="Cerrar"
          className="
            text-white/60 hover:text-white
            transition-colors p-1 rounded-full
            hover:bg-white/10
          "
        >
          <X size={18} />
        </button>
      </div>

      {/* Pasos */}
      <ol className="flex flex-col gap-2">
        <li className="flex items-center gap-3 text-white/80 text-sm">
          <span className="
            flex-shrink-0 w-6 h-6 rounded-full
            bg-[#0A4C7D] text-white text-xs
            flex items-center justify-center font-bold
          ">
            1
          </span>
          <span>
            Tocá el botón{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              Compartir <Share size={13} className="inline" />
            </span>{" "}
            en la barra del navegador
          </span>
        </li>
        <li className="flex items-center gap-3 text-white/80 text-sm">
          <span className="
            flex-shrink-0 w-6 h-6 rounded-full
            bg-[#0A4C7D] text-white text-xs
            flex items-center justify-center font-bold
          ">
            2
          </span>
          <span>
            Seleccioná{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              Agregar a pantalla de inicio <Plus size={13} className="inline" />
            </span>
          </span>
        </li>
        <li className="flex items-center gap-3 text-white/80 text-sm">
          <span className="
            flex-shrink-0 w-6 h-6 rounded-full
            bg-[#0A4C7D] text-white text-xs
            flex items-center justify-center font-bold
          ">
            3
          </span>
          <span>
            Confirmá tocando{" "}
            <span className="font-semibold text-white">Agregar</span>
          </span>
        </li>
      </ol>

      {/* Flecha decorativa apuntando hacia abajo (barra de Safari) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0
        border-l-[10px] border-l-transparent
        border-r-[10px] border-r-transparent
        border-t-[10px] border-t-[#0F1F30]"
      />
    </div>
  );
}

export default InstallBanner;
