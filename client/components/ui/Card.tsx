import React from 'react';
import { ThemeOption } from '@/lib/types';

interface CardProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  themeStyles: Pick<ThemeOption, 'bg' | 'text' | 'shadow'>;
}

const Card: React.FC<CardProps> = ({ children, selected, onClick, themeStyles }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer relative p-6 border-2 border-black rounded-xl transition-all duration-200
        flex flex-col items-center justify-center gap-3 min-h-[160px]
        ${selected 
          ? `${themeStyles.bg} ${themeStyles.text} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-y-1` 
          : 'bg-white text-black hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}
      `}
    >
      {children}
    </div>
  );
};

export default Card;

