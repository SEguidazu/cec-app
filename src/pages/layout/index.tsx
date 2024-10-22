import { Outlet, useMatch } from "react-router-dom";
import { cn } from "@/lib/utils";

import Header from "@/components/custom/header";
import Footer from "@/components/custom/footer";

const Layout = () => {
  const match = useMatch('/')
  const styles = match ? 'min-h-screen bg-cec_primaryDarker py-4' : 'bg-white'

  return (
    <main className={cn('App relative', styles)}>
      {!match && <Header />}

      <Outlet />

      {match && <Footer isContained />}
    </main>
  );
};

export default Layout;
