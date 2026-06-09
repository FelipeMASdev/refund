import { useActionState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

const signInSchema = z.object({
  email: z.email({message: "E-mail inválido"}),
  password: z.string().trim().min(1, {message: "Informe a senha"})
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, {
    email: "",
    password: "",
    message: ""
  });

  const auth = useAuth();

  async function signIn(_: {email: string, password: string, message: string} | null, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password")
      });

      const response = await api.post("/sessions", data);
      auth.save(response.data);

      return {
        email: formData.get("email") as string,
        password: "",
        message: ""
      };
    } catch (error) {

      if (error instanceof ZodError) {
        return {
          email: formData.get("email") as string,
          password: "",
          message: error.issues[0].message
        };
      }

      if (error instanceof AxiosError) {
        return {
          email: formData.get("email") as string,
          password: "",
          message: error.response?.data.message
        };
      }

      return {
        email: formData.get("email") as string,
        password: "",
        message: "Não foi possível realizar o login"
      };
    }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input 
        name="email"
        required 
        legend="E-mail" 
        type="email" 
        placeholder="seu@email.com"
        defaultValue={String(state?.email)}
      />

      <Input 
        name="password"
        required 
        legend="Senha" 
        type="password" 
        placeholder="123456"
        defaultValue={String(state?.password)}
      />

      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a 
        href="/signup" 
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}