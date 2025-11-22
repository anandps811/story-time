import { 
  Crown, 
  Rocket, 
  Ghost, 
  Zap,
  Sparkles,
  Clock,
  Star
} from 'lucide-react';
import { ThemeOption, DurationOption } from '../types';

export const STORY_THEMES: ThemeOption[] = [
  { 
    id: 'fantasy', 
    label: 'Fairy Tale', 
    icon: Crown, 
    bg: 'bg-pink-400', 
    text: 'text-white', 
    shadow: 'shadow-pink-900' 
  },
  { 
    id: 'space', 
    label: 'Space', 
    icon: Rocket, 
    bg: 'bg-blue-500', 
    text: 'text-white', 
    shadow: 'shadow-blue-900' 
  },
  { 
    id: 'adventure', 
    label: 'Adventure', 
    icon: Zap, 
    bg: 'bg-yellow-400', 
    text: 'text-black', 
    shadow: 'shadow-yellow-900' 
  },
  { 
    id: 'spooky', 
    label: 'Spooky', 
    icon: Ghost, 
    bg: 'bg-purple-500', 
    text: 'text-white', 
    shadow: 'shadow-purple-900' 
  },
];

export const STORY_DURATIONS: DurationOption[] = [
  { id: 'short', label: 'Quick', icon: Sparkles },
  { id: 'medium', label: 'Normal', icon: Star },
  { id: 'long', label: 'Long', icon: Clock },
];

export const STORY_TITLES: Record<string, string> = {
  fantasy: "The Knight Who Loved Disco",
  space: "Pizza Party on Mars",
  adventure: "The Floor is Lava!",
  spooky: "The Ghost with the Golden Shoes"
};

