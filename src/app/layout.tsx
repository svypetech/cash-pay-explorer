import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"], // Include required weights
  variable: "--font-montserrat", // Define a CSS variable
});

export const metadata: Metadata = {
  title: "CashPay - Your Finance Partner",
  description: "Your Finance Partner is Coming Soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
