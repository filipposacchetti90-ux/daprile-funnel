import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import FacebookPixel from "../components/FacebookPixel";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "D'Aprile Caffè | Il Vero Caffè Artigianale Italiano",
  description:
    "Scopri il caffè artigianale italiano di altissima qualità. Tostato con cura, consegnato a casa tua.",
  other: {
    "facebook-domain-verification": "ecdvpr98c6gxpdwiaa7jthvyzk08hu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
