import { redirect } from "react-router-dom";
import useAuthStore from "@/store/auth";

/**
 * Loader para rutas protegidas
 * Valida el token con el backend antes de permitir acceso
 * Actualiza el store si el token es válido
 */
export const protectedLoader = async () => {
  const { accessToken, validateToken } = useAuthStore.getState();

  // Si no hay token, redirigir a login
  if (!accessToken) {
    return redirect("/login");
  }

  // Si hay token, validar con el backend
  try {
    if (validateToken) {
      await validateToken();
    }
    
    // Verificar que el user sigue existiendo después de validación
    const currentUser = useAuthStore.getState().user;
    if (!currentUser) {
      return redirect("/login");
    }

    return null;
  } catch (error) {
    // Si el token es inválido o expiró, limpiar y redirigir
    useAuthStore.getState().loggedOut();
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
