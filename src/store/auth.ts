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
  loggedIn: ({ user, accessToken }: LoggedInProps) => void;
  loggedOut: () => void;
  addMembers: ({ members }: AddMembersProps) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        members: [],
        accessToken: null,
        loggedIn: ({ user, accessToken }) =>
          set(() => ({ user: user, accessToken: accessToken })),
        loggedOut: () =>
          set(() => ({ user: null, members: [], accessToken: null })),
        addMembers: ({ members }) => set(() => ({ members: members })),
      }),
      { name: "authStore" }
    )
  )
);

export default useAuthStore;
