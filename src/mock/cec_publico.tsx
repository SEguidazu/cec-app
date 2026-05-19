import { AxiosRequestHeaders, AxiosResponse } from "axios";
import { LoginResponse, MemberResponse } from "@/services/types/member";

export const LOGIN_RESPONSE_200: AxiosResponse<LoginResponse> = {
  data: {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFsZS5tZGdAZ21haWwuY29tIiwibmJmIjoxNzE2NTkxNDIyLCJleHAiOjE3MTcwMjM0MjIsImlhdCI6MTcxNjU5MTQyMn0.H-Sn6f_Pc_BxPADj2a7gaWXNhTYPHAH9ysGkdfdXCE4",
    user: {
      id: 1,
      uId: "561e2650-a3b8-4942-bfd5-af1df96bc9b8",
      name: "Alejandro Del Genio",
      email: "ale.mdg@gmail.com",
      role: "52010fa0-99c2-4266-b035-2622dded5ead"
    },
    hasErrors: false,
    errorMessage: null
  },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders
  }
};

export const MEMBERDATA_RESPONSE_200: AxiosResponse<Array<MemberResponse>> = {
  data: [
    {
      socioUId: "c7b17896-ec19-4b61-8bd5-19b91022a268",
      socioName: "DEBIA CRISTIAN                          ",
      socioDni: 31927471,
      socioNumeroSocio: 463,
      categoriaSocio: "PRACT DEP. RUGBY",
      actividad: "SOCIO JUGADOR CON GRUPO FAMILIAR",
      situacion: "DEBITO AUT."
    },
    {
      socioUId: "901dccfb-e1bc-409f-aa67-e4108d0c3d18",
      socioName: "DEBIA BAUTISTA",
      socioDni: 55071767,
      socioNumeroSocio: 4177,
      categoriaSocio: "PRACT DEP. RUGBY",
      actividad: "PRACTICA DEPORTIVA INFANTILES M-13 A ESCUELITA",
      situacion: "DEBITO AUT."
    },
    {
      socioUId: "6abe847a-0150-4192-a6da-fdcd8ed0bb83",
      socioName: "DEBIA JUAN IGNACIO",
      socioDni: 53718766,
      socioNumeroSocio: 4180,
      categoriaSocio: "PRACT DEP. RUGBY",
      actividad: "PRACTICA DEPORTIVA INFANTILES M-13 A ESCUELITA",
      situacion: "SIN DEUDA"
    },
    {
      socioUId: "e3b8faa4-02d7-4529-9b5c-a386924c74fb",
      socioName: "DEBIA MARIA DEL PILAR",
      socioDni: 57212309,
      socioNumeroSocio: 4746,
      categoriaSocio: "PRACT DEP. HOCKEY",
      actividad: "HOCKEY INFANTILES (7 A 9 DIVISION)",
      situacion: "SIN DEUDA"
    }
  ],
  status: 200,
  statusText: "OK",
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders
  }
}


