"use client";

import React from "react";

import DirectionalContainer from "@/components/GameContainers/DirectionalContainer/DirectionalContainer";
import DirectionalProvider from "@/components/GameContainers/DirectionalContainer/DirectionalProvider";

export const dynamic = "force-dynamic";

export default function DirectionalPage() {
  return (
    <main>
      <DirectionalProvider>
        <DirectionalContainer />
      </DirectionalProvider>
    </main>
  );
}
