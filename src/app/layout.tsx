import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrefCart",
  description: "PrefCart",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/PrefCartRedLogon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <link rel="icon" href="\PrefCartRedLogo.png" />
        </head>
        <body className={inter.className}>
          <CartProvider>{children}</CartProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
