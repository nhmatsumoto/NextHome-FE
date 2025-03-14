"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redireciona para a home se não autenticado
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-lg font-medium">Carregando sessão...</p>;
  }

  return session ? <>{children}</> : null;
}
