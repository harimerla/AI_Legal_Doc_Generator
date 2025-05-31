import { Providers } from "./providers";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Legal Document Generator",
  description: "AI-powered legal document generation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Open+Sans:wght@400;500&family=Fira+Code&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            {!(pathname === "/login" || pathname === "/signup") && <Header />}
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
