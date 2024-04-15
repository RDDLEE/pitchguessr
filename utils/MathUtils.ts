export default class MathUtils {
  public static readonly clamp = (num: number, min: number, max: number): number => {
    return Math.max(min, Math.min(num, max));
  };
}
