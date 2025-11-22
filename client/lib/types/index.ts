import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'action' | 'danger';

export type StoryTheme = 'fantasy' | 'space' | 'adventure' | 'spooky';

export type StoryDuration = 'short' | 'medium' | 'long';

export interface ThemeOption {
  id: StoryTheme;
  label: string;
  icon: LucideIcon;
  bg: string;
  text: string;
  shadow: string;
}

export interface DurationOption {
  id: StoryDuration;
  label: string;
  icon: LucideIcon;
}

export interface StoryData {
  title: string;
  content: string[];
}

export interface StoryParams {
  theme: StoryTheme;
  duration: StoryDuration;
  moral: string;
}

export type ViewType = 'home' | 'create' | 'loading' | 'story';

