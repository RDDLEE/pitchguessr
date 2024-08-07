import dynamic from "next/dynamic";
import React from "react";

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
      <MultiChoiceContainer />
    </main>
  );
}
