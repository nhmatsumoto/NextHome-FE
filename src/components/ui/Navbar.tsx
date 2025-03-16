"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, X, LogIn, LogOut, PlusCircle, Home } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo e título */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="w-7 h-7 text-indigo-600" />
            <span className="text-lg font-semibold text-gray-900">NextHome</span>
          </Link>
        </div>

        {/* Menu para telas grandes */}
        <div className="hidden md:flex items-center space-x-6">
          {session && (
            <Link href="/property/add" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition">
              <PlusCircle className="w-5 h-5" />
              <span>物件を追加</span> {/* "Add Property" em japonês */}
            </Link>
          )}

          {status === "loading" ? (
            <p className="text-gray-600">読み込み中...</p> // "Loading..."
          ) : session ? (
            <>
              <span className="text-gray-700">こんにちは, {session.user?.name} さん</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-1 hover:bg-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>ログアウト</span> {/* "Log out" em japonês */}
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("keycloak")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center space-x-1 hover:bg-indigo-700 transition"
            >
              <LogIn className="w-5 h-5" />
              <span>ログイン</span> {/* "Log in" em japonês */}
            </button>
          )}
        </div>

        {/* Menu Mobile */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col space-y-4 p-4">
            {session && (
              <Link href="/property/add" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition">
                <PlusCircle className="w-5 h-5" />
                <span>物件を追加</span>
              </Link>
            )}

            {status === "loading" ? (
              <p className="text-gray-600">読み込み中...</p>
            ) : session ? (
              <>
                <span className="text-gray-700">こんにちは, {session.user?.name} さん</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-1 hover:bg-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>ログアウト</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("keycloak")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center space-x-1 hover:bg-indigo-700 transition"
              >
                <LogIn className="w-5 h-5" />
                <span>ログイン</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
