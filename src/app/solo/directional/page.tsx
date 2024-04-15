import React from "react";
import dynamic from "next/dynamic";

const SoloDirectionalContainer = dynamic(
  () => {
    return import("../../../../components/solo/directional/SoloDirectionalContainer");
  },
  { ssr: false },
);

export default function SoloDirectionalPage() {
  return (
    <main>
      <SoloDirectionalContainer />
    </main>
  );
}
