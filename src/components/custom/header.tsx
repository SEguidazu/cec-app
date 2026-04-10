import { Download } from "lucide-react";
import LiceoMilitarEscudoCEC from "@/assets/images/cec-liceo-militar-escudo.png";
import BuffetCEC from "@/assets/images/buffet-blur-background.png";
import { usePWAInstall } from "@/hooks/usePWAInstall";

function Header() {
  const { canInstall, isInstalled, installApp } = usePWAInstall();
  const showInstallButton = canInstall && !isInstalled;

  return (
    <header className="pt-4 bg-cec_primaryDarker">
      <div className="flex items-center justify-between px-5 mb-4">
        <img
          src={LiceoMilitarEscudoCEC}
          alt="Liceo Militar General San Martín"
          className="max-w-48 w-full"
        />

        {showInstallButton && (
          <button
            id="pwa-install-button"
            onClick={installApp}
            aria-label="Instalar aplicación"
            className="
              flex items-center gap-2
              px-3 py-2 rounded-lg
              bg-white/10 hover:bg-white/20
              border border-white/20
              text-white text-xs font-semibold
              backdrop-blur-sm
              transition-all duration-200
              active:scale-95
              shadow-md
            "
          >
            <Download size={15} />
            <span>Instalar App</span>
          </button>
        )}
      </div>

      <img src={BuffetCEC} alt="" className="w-full max-h-36 object-cover" />
    </header>
  );
}

export default Header;
