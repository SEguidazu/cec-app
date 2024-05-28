import { Member, User } from "@/types";

export type LoginResponse = {
  accessToken: string;
  user: User;
  hasErrors: boolean;
  errorMessage: string | null;
};

export type MemberResponse = Member;
