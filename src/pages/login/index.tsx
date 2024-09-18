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
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ArrowRight, AlertCircle } from "lucide-react";
import EscudoCEC from "@/assets/images/cec-escudo.png";
import LiceoMilitarCEC from "@/assets/images/cec-liceo-militar.png";

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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await memberService.login(values.dni, values.memberId);

      setAuth({
        user: response.user,
        accessToken: response.accessToken,
      });

      navigate("/dashboard", { replace: true });
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
    <div className="w-full h-full flex flex-col gap-y-8 justify-center items-center">
      <img
        src={EscudoCEC}
        alt="Círculo de Ex Cadetes del Liceo Militar Genral San Martín"
        className="max-w-32	mx-auto"
      />

      <section
        id="login-form"
        className="max-w-72 w-full py-5 px-3 rounded-lg bg-white"
      >
        <h1 className="font-body font-bold text-xl text-black mb-2">
          ¡Bienvenid@s!
        </h1>
        <p className="text-Inter text-lg text-black mb-5">
          Ingres&aacute; tus datos de socio para entrar a nuestro club.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-1">
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-Inter text-base text-black">
                    Usuario
                  </FormLabel>
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
                <FormItem className="mb-3">
                  <FormLabel className="text-Inter text-base text-black">
                    Contraseña
                  </FormLabel>
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

            {!!errorMsg && (
              <>
                <Alert className="col-span-2 mt-2 mb-1" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Ha ocurrido un error.</AlertTitle>
                  <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
                <span className="inline-block text-xs leading-normal">
                  Si tiene algún inconveniente para iniciar sesión, comuníquese
                  con Secretaria al mail
                  <a href="mailto:secretariacecliceomilitargsm@yahoo.com.ar?subject=Error al iniciar sesión | App Socios">
                    secretariacecliceomilitargsm@yahoo.com.ar
                  </a>
                </span>
              </>
            )}

            <Button
              type="submit"
              className="flex items-center gap-x-2 font-body text-base text-white rounded-md mt-5 bg-cec_primary"
            >
              Iniciar sesi&oacute;n
              <ArrowRight className="w-5" />
            </Button>
          </form>
        </Form>
      </section>

      <img src={LiceoMilitarCEC} alt="" className="max-w-40	mx-auto" />
    </div>
  );
}

export default Login;
