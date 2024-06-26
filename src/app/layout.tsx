import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import AppSettingsProvider from "../../components/global/AppSettingsProvider";
import NavShell from "../../components/global/nav-shell/NavShell";

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

const theme = createTheme({

});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <AppSettingsProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <NavShell>
              {children}
            </NavShell>

          </MantineProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
