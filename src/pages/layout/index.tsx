import { Outlet, useMatch } from "react-router-dom";
import { cn } from "@/lib/utils";

import Header from "@/components/custom/header";
import Footer from "@/components/custom/footer";
import InstallBanner from "@/components/custom/InstallBanner";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const Layout = () => {
  const match = useMatch("/login");
  const styles = match ? "min-h-screen bg-cec_primaryDarker py-4" : "bg-white";
  const { isIOS, isInstalled } = usePWAInstall();
  const showIOSBanner = isIOS && !isInstalled;

  return (
    <main className={cn("App relative", styles)}>
      {!match && <Header />}

      <Outlet />

      {match && <Footer isContained />}

      {showIOSBanner && <InstallBanner />}
    </main>
  );
};

export default Layout;
