export enum MemberType {
  ACTIVOS = "ACTIVOS",
  CADETES = "CADETES",
  ADHERENTES = "ADHERENTES",
  PRACTICA_DEPORTIVA = "PRACTICA DEPORTIVA",
  VITALICIO = "VITALICIO",
}

export type Member = {
  categoriaSocio: string;
  socioDni: number;
  socioName: string;
  socioNumeroSocio: number;
  socioUId: string;
  actividad: string;
  situacion: string;
};


export type User = {
  id: number;
  uId: string;
  name: string;
  email: string;
  role: string;
};
