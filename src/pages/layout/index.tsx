import { Outlet } from "react-router-dom";

import EscudoCECLMSM from "@/assets/images/cec-liceo-militar.png";

const Layout = () => {
  return (
    <main className="App bg-buffet-blur bg-cover bg-center bg-primary relative">
      <Outlet />

      <img
        src={EscudoCECLMSM}
        alt=""
        className="max-w-52	mx-auto absolute inset-x-0 bottom-3"
      />
    </main>
  );
};

export default Layout;
