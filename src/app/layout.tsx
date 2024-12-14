import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "S α ɾ α ԋ",
  description: "Portfólio de fotografia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}

        <footer className="p-6 flex items-center justify-center">
          © {currentYear} Sarah Heloísa. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
