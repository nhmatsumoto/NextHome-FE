"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {

 
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslation();
  
  const changeLanguage = (lang: string) => {
    if (lang === "pt-BR") {
      router.push("/");
    } else {
      router.push(`/${lang}${pathname}`);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Esquerda - Logo e Links */}
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold">
          <Link href="/">Next Home</Link>
        </h1>
        {session && (
          <>
            <Link href="/property/add" className="hover:underline">
              Add Property
            </Link>
          </>
        )}
      </div>

      {/* Direita - Usuário e Botões de Login/Logout */}
      <div className="flex items-center space-x-4">
        <>
          <LanguageSwitcher />
        </>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            <span>Hello, {session.user?.name}!</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Log out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("keycloak")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Log in
          </button>
        )}
      </div>
    </nav>
  );
}
