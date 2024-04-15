export interface AppSettings {
  volume: number;
  setVolume?: (_decibels: number) => void;
  // TODO: Theme.
}

export default class AppSettingUtils {
  // FIXME: Volume is in decibels -- need to convert linear to decibels.
  public static readonly VOLUME_SETTING_DEFAULT: number = 15;

  public static readonly VOLUME_SETTING_MIN: number = -20;

  public static readonly VOLUME_SETTING_MAX: number = 40;

  public static readonly VOLUME_SETTING_MUTE: number = AppSettingUtils.VOLUME_SETTING_MIN;

  public static readonly DEFAULT_APP_SETTINGS: AppSettings = {
    volume: AppSettingUtils.VOLUME_SETTING_DEFAULT,
    setVolume: undefined,
  };
}
