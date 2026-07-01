import { Link, Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/useMobile";
import { usePWAInstall } from "@/hooks/usePWAInstall";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import InstallBanner from "@/components/custom/InstallBanner";

import { Download } from "lucide-react";
import EscudoCEC from "@/assets/images/cec.svg";

import { cn } from "@/lib/utils";

const Layout = () => {
  const isMobile = useIsMobile();
  const { isIOS, isInstalled, canInstall, installApp } = usePWAInstall();
  const showIOSBanner = isIOS && !isInstalled;
  const showInstallButton = canInstall && !isInstalled;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header
            className={cn(
              "h-14 flex items-center justify-between border-b bg-card px-4",
              isMobile && "bg-cec_primaryDark",
            )}
          >
            {isMobile && (
              <SidebarTrigger className={cn(isMobile && "text-white")} />
            )}
            {showInstallButton && (
              <button
                id="pwa-install-button"
                onClick={installApp}
                aria-label="Instalar aplicación"
                className={cn(
                  "ml-auto mr-4 flex items-center gap-2 px-3 py-2 rounded-lg  border text-xs font-semibold backdrop-blur-sm transition-all duration-200 active:scale-95 shadow-md",
                  isMobile &&
                    "bg-white/10 hover:bg-white/20 border-white/20 text-white",
                )}
              >
                <Download size={15} />
                <span>Instalar App</span>
              </button>
            )}
            {isMobile && (
              <Link to="/" className="flex items-center gap-2">
                <img src={EscudoCEC} alt="" className="w-10 h-10" />
              </Link>
            )}
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
        {showIOSBanner && <InstallBanner />}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
