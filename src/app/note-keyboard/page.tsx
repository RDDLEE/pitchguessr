"use client";

import React from "react";

import NoteKeyboardContainer from "@/components/GameContainers/NoteKeyboardContainer/NoteKeyboardContainer";
import NoteKeyboardProvider from "@/components/GameContainers/NoteKeyboardContainer/NoteKeyboardProvider";

export const dynamic = "force-dynamic";

export default function NoteKeyboardPage() {
  return (
    <main>
      <NoteKeyboardProvider>
        <NoteKeyboardContainer />
      </NoteKeyboardProvider>
    </main>
  );
}
