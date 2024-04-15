"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export default function ChakraProviders({ children }: { children: React.ReactNode }) {
  /**
   * ColorModeScript produces a server/client className mismatch error only in local dev.
   * @see: https://github.com/chakra-ui/chakra-ui/issues/7845.
   * */
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode="light" />
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
