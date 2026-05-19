import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth";

import { NavLink } from "@/components/custom/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import {
  Home,
  User,
  Trophy,
  CreditCard,
  Users,
  Phone,
  LogOut,
} from "lucide-react";
import EscudoCEC from "@/assets/images/cec.svg";

const items = [
  { title: "Inicio", url: "/dashboard", icon: Home },
  { title: "Mi Perfil", url: "/perfil", icon: User },
  { title: "Mi Plan", url: "/plan", icon: Trophy },
  { title: "Cuotas", url: "/cuotas", icon: CreditCard },
  { title: "Familia", url: "/familia", icon: Users },
  { title: "Contacto", url: "/contacto", icon: Phone },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const socio = useAuthStore((state) => state.user);
  const loggedOut = useAuthStore((state) => state.loggedOut);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-cec_primaryDark">
        {/* Logo */}
        <div
          className={cn(
            `flex justify-between items-center gap-3 px-4 py-5 transition-all duration-200`,
            collapsed && "flex-col-reverse",
          )}
        >
          <div className="flex gap-2">
            <figure className="w-10 h-10 rounded-lg bg-cec_primaryDarker flex items-center justify-center flex-shrink-0">
              <img src={EscudoCEC} alt="" className="w-8 h-8" />
            </figure>
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-bold text-sm text-white/90 truncate">
                  CEC Liceo Militar
                </p>
                <p className="text-xs text-white/80 truncate">{socio?.name}</p>
              </div>
            )}
          </div>

          <SidebarTrigger className="text-white/80" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="text-white/90 hover:text-cec_secondaryDark hover:bg-cec_primary"
                      activeClassName="bg-cec_primary text-cec_secondaryDark font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-cec_primaryDark">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                loggedOut();
                navigate("/login");
              }}
              className="text-white/90 hover:text-cec_secondaryDark bg-cec_primaryDark hover:bg-cec_primary"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && <span>Cerrar sesión</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
