import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChakraProviders from "../../components/global/ChakraProviders";
import AppSettingsProvider from "../../components/global/AppSettingsProvider";
import NavDrawer from "../../components/global/nav-drawer/NavDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PitchGuessr",
  // TODO: Description.
  description: "Pitch practice.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/icons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/icons/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/icons/apple-touch-icon.png",
    },
  ],
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppSettingsProvider>
          <ChakraProviders>
            <NavDrawer />
            {children}
          </ChakraProviders>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
