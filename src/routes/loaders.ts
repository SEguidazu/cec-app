import { redirect } from "react-router-dom";
import useAuthStore from "@/store/auth";
import { memberService } from "@/services/memberService";

/**
 * Loader para rutas protegidas
 * Valida el token con el backend antes de permitir acceso
 * Actualiza el store si el token es válido y carga miembros al ingresar
 */
export const protectedLoader = async () => {
  const { accessToken, validateToken, addMembers, members, loggedOut } =
    useAuthStore.getState();

  // Si no hay token, redirigir a login
  if (!accessToken) {
    return redirect("/login");
  }

  try {
    if (validateToken) {
      await validateToken();
    }

    // Verificar que el user sigue existiendo después de validación
    const currentUser = useAuthStore.getState().user;
    if (!currentUser) {
      return redirect("/login");
    }

    // Cargar members una sola vez cuando aún no estén en el store
    if (!members || members.length === 0) {
      const fetchedMembers = await memberService.fetchMemberData(accessToken);
      addMembers({ members: fetchedMembers });
    }

    return null;
  } catch (error) {
    // Si el token es inválido o expiró, limpiar y redirigir
    loggedOut();
    return redirect("/login");
  }
};

/**
 * Loader para rutas públicas que redirigen si ya está autenticado
 * (ej: login, registro)
 */
export const publicLoader = async () => {
  const { accessToken, user } = useAuthStore.getState();

  if (accessToken && user) {
    return redirect("/dashboard");
  }

  return null;
};
