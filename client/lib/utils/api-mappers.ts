import { StoryTheme, StoryDuration } from '../types';

/**
 * Map frontend theme to backend theme format
 */
export function mapThemeToBackend(theme: StoryTheme): string {
  const themeMap: Record<StoryTheme, string> = {
    fantasy: 'FAIRY TALE',
    space: 'SPACE',
    adventure: 'ADVENTURE',
    spooky: 'SPOOKY',
  };
  return themeMap[theme] || theme.toUpperCase();
}

/**
 * Map frontend duration to backend length format
 */
export function mapDurationToBackend(duration: StoryDuration): 'QUICK' | 'NORMAL' | 'LONG' {
  const durationMap: Record<StoryDuration, 'QUICK' | 'NORMAL' | 'LONG'> = {
    short: 'QUICK',
    medium: 'NORMAL',
    long: 'LONG',
  };
  return durationMap[duration] || 'NORMAL';
}
