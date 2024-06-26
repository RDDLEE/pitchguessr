import React from "react";
import dynamic from "next/dynamic";

// Loaded on client to prevent server/client mismatch when generating answer choices.
const SoloMultiChoiceContainer = dynamic(
  () => {
    return import("../../../../components/solo/solo-multi-choice/SoloMultiChoiceContainer");
  },
  { ssr: false },
);

export default function SoloMultiChoicePage() {
  return (
    <main>
      <SoloMultiChoiceContainer />
    </main>
  );
}
