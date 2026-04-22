export type Subregion =
  | "Sudamérica"
  | "Norteamérica"
  | "Centroamérica"
  | "Caribe"
  | "Europa";

export interface CountryGroup {
  subregion: Subregion;
  countries: string[];
}

export const COUNTRIES_BY_SUBREGION: CountryGroup[] = [
  {
    subregion: "Sudamérica",
    countries: [
      "Argentina",
      "Bolivia",
      "Brasil",
      "Chile",
      "Colombia",
      "Ecuador",
      "Guyana",
      "Paraguay",
      "Perú",
      "Surinam",
      "Uruguay",
      "Venezuela",
    ],
  },
  {
    subregion: "Norteamérica",
    countries: ["Canadá", "Estados Unidos", "México"],
  },
  {
    subregion: "Centroamérica",
    countries: [
      "Belice",
      "Costa Rica",
      "El Salvador",
      "Guatemala",
      "Honduras",
      "Nicaragua",
      "Panamá",
    ],
  },
  {
    subregion: "Caribe",
    countries: [
      "Antigua y Barbuda",
      "Bahamas",
      "Barbados",
      "Cuba",
      "Dominica",
      "Granada",
      "Haití",
      "Jamaica",
      "Puerto Rico",
      "República Dominicana",
      "San Cristóbal y Nieves",
      "San Vicente y las Granadinas",
      "Santa Lucía",
      "Trinidad y Tobago",
    ],
  },
  {
    subregion: "Europa",
    countries: ["España"],
  },
];
