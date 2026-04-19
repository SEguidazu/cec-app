import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

import Layout from "@/pages/layout";
import Login from "@/pages/login";
import Registro from "@/pages/registro";
import Dashboard from "@/pages/dashboard";
import MemberDetails from "@/pages/memberDetails";

import UserAuthentication from "@/routes/guard/UserAuthentication";
import useAuthStore from "@/store/auth";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    {/* <Route path="" element={<Layout />}> */}
    <Route path="/" element={<Navigate to="/dashboard" />} />

    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Registro />} />

    <Route element={<UserAuthentication />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:memberId" element={<MemberDetails />} />
    </Route>
    {/* </Route> */}
  </Routes>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
