import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400"], variable: "--font-inter" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono"
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel"
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "Asim Aljma'an | Systems Developer & ERP Architect",
  description: "Portfolio of Asim Aljma'an, showcasing the OPERIX ERP ecosystem and operational recovery expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} ${cinzel.variable} ${playfair.variable} font-sans antialiased bg-navy`}>
        {children}
      </body>
    </html>
  );
}
