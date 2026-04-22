import z from "zod";

// promotion: z.string().min(1, "La promoción es requerida."),
export const personalSchema = z.object({
  lastName: z.string().min(1, "El apellido es requerido."),
  firstName: z.string().min(1, "El nombre es requerido."),
  dni: z.coerce
    .number({
      invalid_type_error: "El DNI es inválido.",
      required_error: "El DNI es requerido.",
    })
    .refine(
      (val) => val.toString().length >= 6 && val.toString().length <= 8,
      "El DNI es inválido.",
    ),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es requerida.",
  }),
  email: z
    .string()
    .email("El email es inválido")
    .min(1, "El email es requerido."),
  phone: z
    .string({ required_error: "El teléfono es requerido." })
    .min(8, "El teléfono es requerido."),
  address: z.string().min(1, "La dirección es requerida."),
  city: z.string().min(1, "La ciudad es requerida."),
  country: z.string().min(1, "El país es requerido."),
  preferredContact: z.enum(["email", "whatsapp", "phone"]),
});
