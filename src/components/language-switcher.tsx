"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const supportedLocales = ["pt-BR", "ja-JP"];

  const changeLanguage = (newLang: string) => {
    const pathSegments = pathname.split("/").filter(Boolean); // Remove strings vazias
    const currentLang = pathSegments[0]; // O primeiro segmento é geralmente o idioma

    if (supportedLocales.includes(currentLang)) {
      pathSegments[0] = newLang; // Substitui o idioma existente
    } else {
      pathSegments.unshift(newLang); // Adiciona o idioma no início se não houver um na URL
    }

    const newPath = `/${pathSegments.join("/")}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Botão do dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
      >
        🌐 Selecione o idioma
        <svg
          className="w-4 h-4 ml-2 transform transition-transform"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Opções do dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
          <button
            onClick={() => changeLanguage("pt-BR")}
            className="flex items-center w-full px-4 py-2 text-left text-black hover:bg-gray-200"
          >
            🇧🇷 Português
          </button>
          <button
            onClick={() => changeLanguage("ja-JP")}
            className="flex items-center w-full px-4 py-2 text-left text-black hover:bg-gray-200"
          >
            🇯🇵 日本語
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
