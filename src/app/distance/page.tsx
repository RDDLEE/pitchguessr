"use client";

import React from "react";

import DistanceContainer from "@/components/GameContainers/DistanceContainer/DistanceContainer";
import DistanceProvider from "@/components/GameContainers/DistanceContainer/DistanceProvider";

export const dynamic = "force-dynamic";

export default function DistancePage() {
  return (
    <main>
      <DistanceProvider>
        <DistanceContainer />
      </DistanceProvider>
    </main>
  );
}
