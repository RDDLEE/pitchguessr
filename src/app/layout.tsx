import "./globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import AppSettingsProvider from "@/components/AppSettingsProvider/AppSettingsProvider";
import NavShell from "@/components/NavShell/NavShell";
import theme from "@/theme/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PitchGuessr",
  description: "Practice your pitch perception with these fun minigames.",
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
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AppSettingsProvider>
            <NavShell>
              {children}
            </NavShell>
          </AppSettingsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
