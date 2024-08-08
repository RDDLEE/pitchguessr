"use client";

import React from "react";

import SliderContainer from "@/components/GameContainers/SliderContainer/SliderContainer";
import SliderProvider from "@/components/GameContainers/SliderContainer/SliderProvider";

export const dynamic = "force-dynamic";

export default function SliderPage() {
  return (
    <main>
      <SliderProvider>
        <SliderContainer />
      </SliderProvider>
    </main>
  );
}
