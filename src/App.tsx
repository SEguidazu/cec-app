import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import EscudoCEC from "@/assets/images/cec-escudo.png";
import EscudoCECLMSM from "@/assets/images/cec-liceo-militar.png";
import { Input } from "./components/ui/input";

enum MemberType {
  ACTIVOS = "ACTIVOS",
  CADETES = "CADETES",
  ADHERENTES = "ADHERENTES",
  PRACTICA_DEPORTIVA = "PRACTICA DEPORTIVA",
  VITALICIO = "VITALICIO",
}

const formSchema = z.object({
  dni: z.coerce.number({
    required_error: "Please select an email to display.",
  }),
  memberId: z.coerce.number({
    required_error: "Please select an email to display.",
  }),
  memberType: z.nativeEnum(MemberType, { required_error: "" }),
});

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: undefined,
      memberId: undefined,
      memberType: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="w-full h-screen bg-buffet-blur bg-cover bg-center bg-primary flex flex-col justify-center items-center relative">
      <img
        src={EscudoCEC}
        alt="Círculo de Ex Cadetes del Liceo Militar Genral San Martín"
        className="max-w-32	mx-auto mb-14"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Tu DNI" {...field} />
                </FormControl>
                <FormMessage />
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <img
        src={EscudoCECLMSM}
        alt=""
        className="max-w-52	mx-auto absolute bottom-4"
      />
    </main>
  );
}

export default App;
