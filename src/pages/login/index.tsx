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

import { ArrowRight, AlertCircle } from "lucide-react";
import EscudoCEC from "@/assets/images/cec-escudo.png";
import LiceoMilitarCEC from "@/assets/images/cec-liceo-militar.png";

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
    <div className="w-full h-full flex flex-col gap-y-16 justify-center items-center">
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
            <FormField
              control={form.control}
              name="memberType"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-Inter text-base text-black">
                    Categor&iacute;a de Socio
                  </FormLabel>
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
                <AlertTitle>Ha ocurrido un error.</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
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
