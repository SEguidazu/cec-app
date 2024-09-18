import { Outlet, useMatch } from "react-router-dom";
import { cn } from "@/lib/utils";

import Header from "@/components/custom/header";

const Layout = () => {
  const match = useMatch('/')
  const styles = match ? 'min-h-screen bg-cec_primaryDarker py-4' : 'bg-white'

  return (
    <main className={cn('App relative', styles)}>
      {!match && <Header />}

      <Outlet />
    </main>
  );
};

export default Layout;
