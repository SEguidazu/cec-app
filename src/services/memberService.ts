import axios, { AxiosResponse } from "axios";
import { LoginResponse, MemberResponse } from "./types/member";

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface IMemberService {
  login(dni: number, memberId: number): Promise<LoginResponse>;
  fetchMemberData(accessToken: string): Promise<Array<MemberResponse>>;
}

class MemberService implements IMemberService {
  private LOGIN_URL: string = "/auth";
  private MEMBER_URL: string = "/user/socios";

  async login(dni: number, memberId: number) {
    const { data: memberData }: AxiosResponse<LoginResponse> =
      await apiClient.post(this.LOGIN_URL, {
        NroSocio: memberId,
        DNI: dni,
      });

    return memberData;
  }

  async fetchMemberData(accessToken: string) {
    const { data: memberData }: AxiosResponse<Array<MemberResponse>> =
      await apiClient.get(this.MEMBER_URL, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

    return memberData;
  }
}

export const memberService: IMemberService = new MemberService();
