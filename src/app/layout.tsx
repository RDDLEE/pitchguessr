import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChakraProviders from "../../components/global/ChakraProviders";
import AppSettingsProvider from "../../components/global/AppSettingsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PitchGuessr",
  // TODO: Description.
  description: "Pitch practice.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppSettingsProvider>
          <ChakraProviders>
            {children}
          </ChakraProviders>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
