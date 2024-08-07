import { createContext } from "react";

import type { AppSettings } from "../utils/AppSettingUtils";
import AppSettingUtils from "../utils/AppSettingUtils";

export const AppSettingsContext = createContext<AppSettings>({
  volume: AppSettingUtils.VOLUME_SETTING_DEFAULT,
  setVolume: undefined,
});
