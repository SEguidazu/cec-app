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
import Contacto from "@/pages/contacto";

import { protectedLoader, publicLoader } from "@/routes/loaders";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" />} />

    <Route path="/login" element={<Login />} loader={publicLoader} />
    <Route path="/registro" element={<Registro />} loader={publicLoader} />

    <Route element={<Layout />}>
      <Route
        path="/dashboard"
        element={<Dashboard />}
        loader={protectedLoader}
      />
      <Route path="/perfil" element={<Dashboard />} loader={protectedLoader} />
      <Route path="/plan" element={<Dashboard />} loader={protectedLoader} />
      <Route path="/cuotas" element={<Dashboard />} loader={protectedLoader} />
      <Route
        path="/familia"
        element={<MemberDetails />}
        loader={protectedLoader}
      />
      <Route path="/contacto" element={<Contacto />} loader={protectedLoader} />
    </Route>
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
