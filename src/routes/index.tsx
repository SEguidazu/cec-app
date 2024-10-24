import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/pages/layout";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import MemberDetails from "@/pages/memberDetails";

import UserAuthentication from "@/routes/guard/UserAuthentication";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/login" element={<Login />} />

        <Route element={<UserAuthentication />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:memberId" element={<MemberDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
