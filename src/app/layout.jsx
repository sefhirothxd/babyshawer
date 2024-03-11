import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Baby Shawer de Vasco",
  description: "Registro de regalos para el baby shawer de Vasco",
  image: "/jesus.webp",
  url: "https://babyshawer.vercel.app/",
  type: "website",
  keywords: "baby shawer, vasco, regalos",
  locale: "es_ES",
  site_name: "Baby Shawer de Vasco",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content={metadata.image} />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
