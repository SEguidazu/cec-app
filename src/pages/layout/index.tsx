import { Outlet } from "react-router-dom";

import EscudoCECLMSM from "@/assets/images/cec-liceo-militar.png";

const Layout = () => {
  return (
    <main className="App bg-[url('@/assets/images/buffet-blur-background.png')] bg-cover bg-center bg-cec_primaryDarker relative">
      <Outlet />

      <img
        src={EscudoCECLMSM}
        alt=""
        className="max-w-52	mx-auto absolute inset-x-0 bottom-6"
      />
    </main>
  );
};

export default Layout;
