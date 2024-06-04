import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { memberService } from "@/service/memberService";
import { isAxiosError } from "axios";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { MoveRight, AlertCircle } from "lucide-react";
import EscudoCEC from "@/assets/images/cec-escudo.png";

import { MemberType } from "@/types";

const formSchema = z.object({
  dni: z.coerce
    .number({
      invalid_type_error: "El DNI es inválido.",
      required_error: "El DNI es requerido.",
    })
    .refine(
      (val) => val.toString().length >= 6 && val.toString().length <= 8,
      "El DNI es inválido."
    ),
  memberId: z.coerce.number({
    invalid_type_error: "El número de socio es inválido.",
    required_error: "El número de socio es requerido.",
  }),
  memberType: z.nativeEnum(MemberType, {
    required_error: "Debe seleccionar una categoría de socio.",
  }),
});

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: undefined,
      memberId: undefined,
      memberType: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await memberService.login(values.dni, values.memberId);

      setAuth({
        user: response.user,
        accessToken: response.accessToken,
      });

      navigate('/dashboard', { replace: true });
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error?.response?.data?.errorMessage);
      } else {
        setErrorMsg(
          "Se produjo un error inesperado, intente nuevamente más tarde."
        );
      }
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img
        src={EscudoCEC}
        alt="Círculo de Ex Cadetes del Liceo Militar Genral San Martín"
        className="max-w-32	mx-auto mb-8"
      />

      <section
        id="login-form"
        className="max-w-80 w-full p-4 rounded-lg shadow-lg bg-white"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Tu DNI"
                      aria-describedby="dni-message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="dni-message" className="font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Tu número de socio"
                      aria-describedby="memberId-message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="memberId-message" className="font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="memberType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría de Socio</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl aria-describedby="memberType-message">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione su categoría de socio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={MemberType.ACTIVOS}>
                        {MemberType.ACTIVOS}
                      </SelectItem>
                      <SelectItem value={MemberType.ADHERENTES}>
                        {MemberType.ADHERENTES}
                      </SelectItem>
                      <SelectItem value={MemberType.CADETES}>
                        {MemberType.CADETES}
                      </SelectItem>
                      <SelectItem value={MemberType.PRACTICA_DEPORTIVA}>
                        {MemberType.PRACTICA_DEPORTIVA}
                      </SelectItem>
                      <SelectItem value={MemberType.VITALICIO}>
                        {MemberType.VITALICIO}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage id="memberType-message" className="font-bold" />
                </FormItem>
              )}
            />

            {!!errorMsg && (
              <Alert className="col-span-2 mt-2" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Ha ocurrido un error</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full flex items-center gap-x-3 text-lg rounded-lg bg-cec_primary"
            >
              Iniciar sesión
              <MoveRight className="w-6" />
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}

export default Login;
