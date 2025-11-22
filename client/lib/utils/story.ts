import { StoryData, StoryTheme } from '../types';
import { STORY_TITLES } from '../constants';

export const generateMockStory = (theme: StoryTheme, moral: string): StoryData => {
  const title = STORY_TITLES[theme] || "SUPER STORY!";

  return {
    title,
    content: [
      `BOOM! The day started with a giant noise. But don't worry, it was just a friendly dragon sneezing glitter all over the town square!`,
      `Everyone was running around. It was chaos! "Who will clean this up?" shouted the Mayor. That's when our hero stepped up. They remembered the golden rule of ${moral || 'teamwork'}.`,
      `"I can help!" shouted our hero. They grabbed a giant vacuum cleaner and got to work. It was hard, messy work, but they didn't give up.`,
      `Suddenly, all the townspeople grabbed brooms and joined in! Why? Because they saw how cool it is to practice ${moral || 'teamwork'}.`,
      `In the end, the town was sparkling clean, and they threw a giant dance party to celebrate. The End!`
    ]
  };
};

