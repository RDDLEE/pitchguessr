"use client";

import React, { useCallback, useMemo, useState } from "react";

import type { AppSettings } from "@/utils/AppSettingUtils";
import AppSettingUtils from "@/utils/AppSettingUtils";
import MathUtils from "@/utils/MathUtils";

import { AppSettingsContext } from "./AppSettingsContext";

export default function AppSettingsProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  // TODO: Init and save global settings from localStorage.
  const [volume, setVolume] = useState<number>(AppSettingUtils.VOLUME_SETTING_DEFAULT);

  const setVolumeValidator = useCallback((decibels: number) => {
    const newVolume = MathUtils.clamp(decibels, AppSettingUtils.VOLUME_SETTING_MIN, AppSettingUtils.VOLUME_SETTING_MAX);
    setVolume(newVolume);
  }, []);

  const appSettings = useMemo<AppSettings>(() => {
    return {
      volume: volume,
      setVolume: setVolumeValidator,
    };
  }, [volume, setVolumeValidator]);

  return (
    <AppSettingsContext.Provider value={appSettings}>
      {children}
    </AppSettingsContext.Provider>
  );
}
