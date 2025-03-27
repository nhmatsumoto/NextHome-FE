import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import AuthSessionProvider from "@/components/auth/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextHome - Search Your Home in Japan",
  description: "Next.js + Keycloak + NextAuth + .NET CORE + SQL Server + TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-lt-installed="true">
      <body className={inter.className}>
        <AuthSessionProvider>
          <Navbar />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
