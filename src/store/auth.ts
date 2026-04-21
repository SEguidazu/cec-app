import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Member, User } from "@/types";

interface LoggedInProps {
  user: User;
  accessToken: string;
}

interface AddMembersProps {
  members: Array<Member>;
}

interface AuthState {
  user: User | null;
  members: Array<Member>;
  accessToken: string | null;
  isLoading: boolean;
  loggedIn: ({ user, accessToken }: LoggedInProps) => void;
  loggedOut: () => void;
  addMembers: ({ members }: AddMembersProps) => void;
  validateToken: () => Promise<void>;
}

const authSelectors = {
  isAuthenticated: (state: AuthState) => !!state.user && !!state.accessToken,
  currentMember: (state: AuthState) => {
    if (!state.user) return null;
    const userUId = state.user.uId;
    return state.members.find((member) => member.socioUId === userUId) || null;
  },
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        members: [],
        accessToken: null,
        isLoading: false,
        loggedIn: ({ user, accessToken }) =>
          set(() => ({
            user: user,
            accessToken: accessToken,
          })),
        loggedOut: () =>
          set(() => ({
            user: null,
            members: [],
            accessToken: null,
          })),
        addMembers: ({ members }) => set(() => ({ members: members })),
        validateToken: async () => {
          const { accessToken } = get();
          if (!accessToken) {
            throw new Error("No access token");
          }

          set({ isLoading: true });

          try {
            // TODO: Implementar llamada al backend para validar token
            // const response = await axios.get('/api/auth/validate', {
            //   headers: { Authorization: `Bearer ${accessToken}` }
            // });

            // Por ahora, simulamos validación exitosa
            // En producción, aquí validarías con tu backend
            // Si el token es inválido, lanzar error

            set({ isLoading: false });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
      }),
      { name: "authStore" },
    ),
  ),
);

export default useAuthStore;

export const useIsAuthenticated = () =>
  useAuthStore(authSelectors.isAuthenticated);
export const useCurrentMember = () => useAuthStore(authSelectors.currentMember);
