import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function useTranslation() {
  const pathname = usePathname();
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const lang = pathname.startsWith("/ja-JP") ? "ja-JP" : "pt-BR";
    import(`@/locales/${lang}.json`).then((module) => setTranslations(module.default));
  }, [pathname]);

  return (key: string) => translations[key] || key;
}