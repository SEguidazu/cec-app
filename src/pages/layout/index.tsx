import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App h-screen bg-cover bg-center bg-cec_primaryDarker relative">
      <Outlet />
    </main>
  );
};

export default Layout;
