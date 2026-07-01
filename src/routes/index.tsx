import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

import Layout from "@/pages/layout";
import Login from "@/pages/login";
import Registro from "@/pages/registro";
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import Membership from "@/pages/membership";
import Payment from "@/pages/payment";
import MemberDetails from "@/pages/memberDetails";
import Contacto from "@/pages/contacto";

import { protectedLoader, publicLoader } from "@/routes/loaders";
import PaymentSuccess from "@/pages/payment/results/success";
import PaymentCancel from "@/pages/payment/results/cancel";
import PaymentPending from "@/pages/payment/results/pending";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: publicLoader,
  },
  {
    path: "/registro",
    element: <Registro />,
    loader: publicLoader,
  },
  {
    path: "/",
    element: <Layout />,
    loader: protectedLoader,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "perfil",
        element: <Profile />,
      },
      {
        path: "plan",
        element: <Membership />,
      },
      {
        path: "cuotas",
        element: <Payment />,
      },
      {
        path: "familia",
        element: <MemberDetails />,
      },
      {
        path: "contacto",
        element: <Contacto />,
      },
    ],
  },
  {
    path: "/pago/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/pago/cancel",
    element: <PaymentCancel />,
  },
  {
    path: "/pago/pending",
    element: <PaymentPending />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
