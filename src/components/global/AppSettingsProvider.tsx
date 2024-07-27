"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";
import AppSettingUtils, { AppSettings } from "../../utils/AppSettingUtils";
import MathUtils from "../../utils/MathUtils";

export const AppSettingsContext = createContext<AppSettings>({
  volume: AppSettingUtils.VOLUME_SETTING_DEFAULT,
  setVolume: undefined,
});

export default function AppSettingsProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  // TODO: Init and save global settings from localStorage.
  const [volume, setVolume] = useState<number>(AppSettingUtils.VOLUME_SETTING_DEFAULT);

  const setVolumeValidator = useCallback((decibels: number) => {
    const validVolume = MathUtils.clamp(decibels, AppSettingUtils.VOLUME_SETTING_MIN, AppSettingUtils.VOLUME_SETTING_MAX);
    if (validVolume !== volume) {
      setVolume(validVolume);
    }
  }, [volume]);

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
