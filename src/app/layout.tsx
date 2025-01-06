import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";

const robotoFont = localFont({
  src: "../fonts/Roboto.ttf",
  display: "swap",
  variable: "--font-roboto",
});

const poppinsFont = localFont({
  src: "../fonts/Poppins-Medium.ttf",
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "S α ɾ α ԋ",
  description:
    "Aqui você encontra experiências memoráveis eternizadas em fotos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${robotoFont.variable} ${poppinsFont.variable}`}
    >
      <body>
        <Navbar />
        {children}

        <footer className="p-6 flex items-center justify-center font-sans">
          © {currentYear} Sarah Heloísa. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
