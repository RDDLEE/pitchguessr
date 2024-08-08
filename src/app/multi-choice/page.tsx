"use client";

import dynamic from "next/dynamic";
import React from "react";

import MultiChoiceProvider from "@/components/GameContainers/MultiChoiceContainer/MultiChoiceProvider";

// Loaded on client to prevent server/client mismatch when generating answer choices. Will make pure later.
const MultiChoiceContainer = dynamic(
  () => {
    return import("../../components/GameContainers/MultiChoiceContainer/MultiChoiceContainer");
  },
  { ssr: false },
);

export default function MultiChoicePage() {
  return (
    <main>
      <MultiChoiceProvider>
        <MultiChoiceContainer />
      </MultiChoiceProvider>
    </main>
  );
}
