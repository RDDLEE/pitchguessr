import React from "react";
import dynamic from "next/dynamic";

const SoloSliderContainer = dynamic(
  () => {
    return import("../../../../components/solo/slider/SoloSliderContainer");
  },
  { ssr: false },
);

export default function SoloSliderPage() {
  return (
    <main>
      <SoloSliderContainer />
    </main>
  );
}
