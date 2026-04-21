import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMobile";
import LiceoMilitarEscudoCEC from "@/assets/images/cec-liceo-militar-escudo.png";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header
            className={cn(
              "h-14 flex items-center border-b bg-card px-4 relative",
              isMobile && "bg-cec_primaryDark",
            )}
          >
            <SidebarTrigger className={cn(isMobile && "text-white")} />
            {isMobile && (
              <img
                src={LiceoMilitarEscudoCEC}
                alt=""
                className="max-w-36 w-full absolute right-4"
              />
            )}
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
