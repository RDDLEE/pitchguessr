"use client";

import ChordContainer from "@/components/GameContainers/ChordContainer/ChordContainer";
import ChordProvider from "@/components/GameContainers/ChordContainer/ChordProvider";

export const dynamic = "force-dynamic";

export default function ChordPage() {
  return (
    <main>
      <ChordProvider>
        <ChordContainer />
      </ChordProvider>
    </main>
  );
}
