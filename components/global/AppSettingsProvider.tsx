"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";

export interface AppSettings {
  volume: number;
  setVolume: (_decibels: number) => void;
  // TODO: Theme.
}

export const AppSettingsContext = createContext<AppSettings | undefined>(undefined);

export default function AppSettingsProvider(
  { children }: Readonly<{ children: React.ReactNode; }>,
) {
  // TODO: Init and save global settings from localStorage.
  // TODO: Decibel range.
  const [volume, setVolume] = useState<number>(0);

  const setVolumeValidator = useCallback((decibels: number) => {
    let validVolume = decibels;
    if (validVolume < -50) {
      validVolume = -50;
    } else if (validVolume > 50) {
      validVolume = 50;
    }
    if (validVolume !== volume) {
      setVolume(validVolume);
    }
  }, [volume, setVolume]);

  const globalSettings = useMemo<AppSettings>(() => {
    return {
      volume: volume,
      setVolume: setVolumeValidator,
    };
  }, [volume, setVolumeValidator]);

  return (
    <AppSettingsContext.Provider value={globalSettings}>
      {children}
    </AppSettingsContext.Provider>
  );
}
