import { Routes, Route } from "react-router-dom";

import UserAuthentication from "@/routes/guard/UserAuthentication";

import Layout from "@/pages/layout";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />

        <Route element={<UserAuthentication />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
