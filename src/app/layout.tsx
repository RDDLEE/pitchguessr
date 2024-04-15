import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChakraProviders from "../../components/global/ChakraProviders";
import GlobalSettingsProvider from "../../components/global/GlobalSettingsProvider";

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
        <GlobalSettingsProvider>
          <ChakraProviders>
            {children}
          </ChakraProviders>
        </GlobalSettingsProvider>
      </body>
    </html>
  );
}
