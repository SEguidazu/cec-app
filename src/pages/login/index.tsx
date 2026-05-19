import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { memberService } from "@/services/memberService";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/store/auth";
import { useToast } from "@/hooks/useToast";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LogIn } from "lucide-react";
import EscudoCEC from "@/assets/images/cec.svg";

const formSchema = z.object({
  dni: z.coerce
    .number({
      invalid_type_error: "El DNI es inválido.",
      required_error: "El DNI es requerido.",
    })
    .refine(
      (val) => val.toString().length >= 6 && val.toString().length <= 8,
      "El DNI es inválido.",
    ),
  memberId: z.coerce.number({
    invalid_type_error: "El número de socio es inválido.",
    required_error: "El número de socio es requerido.",
  }),
});

function Login() {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasError, setHasError] = useState<boolean>(false);

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

      loggedIn({
        user: response.user,
        accessToken: response.accessToken,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setHasError(true);
      if (isAxiosError(error)) {
        toast({
          title: "Ha ocurrido un error",
          description: error?.response?.data?.errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ha ocurrido un error",
          description:
            "Se produjo un error inesperado, intente nuevamente más tarde.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <main className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/20" />
        <div className="relative z-10 text-center space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
            <img
              src={EscudoCEC}
              alt=""
              className="max-w-32	mx-auto"
              aria-hidden
            />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground">
            CEC Liceo Militar
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-md">
            Portal de Socios — Hockey & Rugby
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <div className="w-16 h-1 rounded-full bg-accent" />
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6  bg-gradient-to-br from-primary via-primary/95 to-primary/90 lg:bg-none lg:bg-background">
        <Card
          id="card-container"
          className="w-full max-w-md shadow-lg border-0 shadow-primary/5"
        >
          <CardHeader className="text-center space-y-2">
            <div className="lg:hidden mx-auto w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-2">
              <img
                src={EscudoCEC}
                alt=""
                className="max-w-20	mx-auto"
                aria-hidden
              />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              Iniciar Sesión
            </CardTitle>
            <CardDescription>Ingresá con tu DNI y contraseña</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full px-1"
              >
                <FormField
                  control={form.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-Inter text-base text-black">
                        Usuario
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Tu DNI" {...field} />
                      </FormControl>
                      <FormMessage className="font-bold" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem className="mb-4">
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
                      <FormMessage
                        id="memberId-message"
                        className="font-bold"
                      />
                    </FormItem>
                  )}
                />

                {hasError && (
                  <span className="inline-block text-sm leading-normal text-balance mb-4">
                    Si tiene algún inconveniente para iniciar sesión,
                    comuníquese con Secretaria al mail{" "}
                    <a
                      href="mailto:secretariacecliceomilitargsm@yahoo.com.ar?subject=Error al iniciar sesión | App Socios"
                      className="underline"
                    >
                      secretariacecliceomilitargsm
                      <br />
                      @yahoo.com.ar
                    </a>
                  </span>
                )}

                <Button
                  type="submit"
                  className="w-full bg-cec_secondaryDark text-accent-foreground hover:bg-cec_secondaryDark/70"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Ingresar
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <Link
                to="/registro"
                className="text-sm text-cec_secondaryDark hover:underline font-medium"
              >
                ¿No tenés cuenta? Registrate como nuevo socio
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default Login;
