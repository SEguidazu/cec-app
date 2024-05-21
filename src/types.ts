export enum MemberType {
  ACTIVOS = "ACTIVOS",
  CADETES = "CADETES",
  ADHERENTES = "ADHERENTES",
  PRACTICA_DEPORTIVA = "PRACTICA DEPORTIVA",
  VITALICIO = "VITALICIO",
}

export type User = {
  id: number;
  uId: string;
  name: string;
  email: string;
  role: string;
};
