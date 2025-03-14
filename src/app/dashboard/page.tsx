"use client";

import Loader from "@/components/ui/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loader />
  }

  return (
    <div className="p-4">
      <h1>Área Protegida</h1>
      <p>Bem-vindo, {session?.user?.name}</p>
    </div>
  );
}