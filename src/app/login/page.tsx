"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha incorretos.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* 🔑 Ícone e Título */}
        <div className="flex flex-col items-center mb-6">
          <Lock className="w-12 h-12 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900 mt-2">Faça Login</h2>
        </div>

        {/* 📝 Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* 📧 Campo de Email */}
          <div>
            <label className="block text-gray-700">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                className="w-full border p-3 pl-10 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          {/* 🔑 Campo de Senha */}
          <div>
            <label className="block text-gray-700">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                className="w-full border p-3 pl-10 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {/* ⚠️ Mensagem de Erro */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* 🔘 Botão de Login */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold flex justify-center items-center space-x-2 hover:bg-indigo-700 transition duration-200"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
            <span>{loading ? "Entrando..." : "Entrar"}</span>
          </button>
        </form>

        {/* 🔗 Opções Alternativas */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Ou entre com:</p>
          <button
            onClick={() => signIn("keycloak")}
            className="mt-3 w-full bg-gray-900 text-white py-3 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-800 transition duration-200"
          >
            <LogIn className="w-5 h-5" />
            <span>Entrar com Keycloak</span>
          </button>
        </div>
      </div>
    </div>
  );
}
