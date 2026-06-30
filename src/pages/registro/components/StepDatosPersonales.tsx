import type {
  ControllerFieldState,
  Path,
  UseFormReturn,
} from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { COUNTRIES } from "../countries";
import type { PersonalFormData, StepDatosPersonalesProps } from "../types";

// ---------------------------------------------------------------------------
// Local helpers — only relevant to this form, intentionally not exported
// ---------------------------------------------------------------------------

function getInputClassName(fieldState: ControllerFieldState): string {
  if (fieldState.invalid) return "border-destructive";
  if (fieldState.isDirty && !fieldState.invalid) return "border-success";
  return "";
}

/**
 * Convierte un valor Date a string "YYYY-MM-DD" de forma segura.
 * Devuelve "" si el valor es nulo, indefinido o una fecha inválida,
 * evitando que toISOString() lance RangeError durante la escritura parcial.
 */
function toDateInputValue(value: Date | undefined | null): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

/** Renders a standard labeled text / email / tel input field via RHF. */
interface InputFieldProps {
  form: UseFormReturn<PersonalFormData>;
  name: Path<PersonalFormData>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

function InputField({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: InputFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-2">
          <FormLabel>
            {label} <span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={(field.value ?? "") as string}
              aria-required="true"
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.error ? `${field.name}-error` : undefined
              }
              className={getInputClassName(fieldState)}
            />
          </FormControl>
          <FormMessage id={`${field.name}-error`} />
        </FormItem>
      )}
    />
  );
}

// ---------------------------------------------------------------------------
// Step component
// ---------------------------------------------------------------------------

export function StepDatosPersonales({ form }: StepDatosPersonalesProps) {
  return (
    <Form {...form}>
      <form className="space-y-4">
        {/* Row 1 — Nombre / Apellido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            form={form}
            name="firstName"
            label="Nombre"
            placeholder="Carlos"
          />
          <InputField
            form={form}
            name="lastName"
            label="Apellido"
            placeholder="González"
          />
        </div>

        {/* Row 2 — DNI / Fecha de nacimiento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* DNI: coerced to number by zod — keep type="number" */}
          <FormField
            control={form.control}
            name="dni"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  DNI <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="11222333"
                    {...field}
                    aria-required="true"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.error ? `${field.name}-error` : undefined
                    }
                    className={getInputClassName(fieldState)}
                  />
                </FormControl>
                <FormMessage id={`${field.name}-error`} />
              </FormItem>
            )}
          />

          {/* Fecha de nacimiento: toDateInputValue() evita RangeError en fechas parciales */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Fecha de nacimiento{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={toDateInputValue(field.value)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      field.onChange(isNaN(date.getTime()) ? undefined : date);
                    }}
                    aria-required="true"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.error ? `${field.name}-error` : undefined
                    }
                    className={getInputClassName(fieldState)}
                  />
                </FormControl>
                <FormMessage id={`${field.name}-error`} />
              </FormItem>
            )}
          />
        </div>

        {/* Row 3 — Teléfono / Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            form={form}
            name="phone"
            label="Teléfono"
            placeholder="+54 11 5555-1234"
            type="tel"
          />
          <InputField
            form={form}
            name="email"
            label="Email"
            placeholder="email@ejemplo.com"
            type="email"
          />
        </div>

        {/* Row 4 — Dirección / Ciudad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            form={form}
            name="address"
            label="Dirección"
            placeholder="Calle 123"
          />
          <InputField
            form={form}
            name="city"
            label="Ciudad"
            placeholder="Buenos Aires"
          />
        </div>

        {/* Row 5 — País / Contacto preferido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  País <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      aria-required="true"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.error ? `${field.name}-error` : undefined
                      }
                      className={getInputClassName(fieldState)}
                    >
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage id={`${field.name}-error`} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Contacto preferido <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      aria-required="true"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.error ? `${field.name}-error` : undefined
                      }
                      className={getInputClassName(fieldState)}
                    >
                      <SelectValue placeholder="Selecciona un método" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Teléfono</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage id={`${field.name}-error`} />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
