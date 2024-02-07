import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";

import { ToastContainer } from "react-toastify";

const Siffon = localFont({
  src: "../../public/fonts/SIFONN-BASIC.otf",
  variable: "--font-siffon-basic",
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Meteo API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#100a2a] w-full h-full">
      <body
        className={`${poppins.variable} ${Siffon.variable} font-sans w-full h-full`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
