import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { StoryParams } from '@/lib/types';
import { STORY_THEMES, STORY_DURATIONS } from '@/lib/constants';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface CreateViewProps {
  onGenerate: (params: StoryParams) => void;
  onBack: () => void;
}

const CreateView: React.FC<CreateViewProps> = ({ onGenerate, onBack }) => {
  const [theme, setTheme] = useState<string>('');
  const [duration, setDuration] = useState<string>('medium');
  const [moral, setMoral] = useState('');

  const canGenerate = theme && moral.length > 2;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={onBack} 
          className="p-3 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            className="text-black"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="font-display text-5xl text-black">BUILD YOUR STORY</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-10">
          {/* Theme Selection */}
          <section>
            <div className="bg-black text-white inline-block px-3 py-1 mb-4 font-display text-xl transform -rotate-1">
              Step 1: Pick a Vibe
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STORY_THEMES.map((t) => {
                const Icon = t.icon;
                const isSelected = theme === t.id;
                return (
                  <Card 
                    key={t.id} 
                    selected={isSelected} 
                    themeStyles={t}
                    onClick={() => setTheme(t.id)}
                  >
                    <Icon size={48} strokeWidth={2.5} />
                    <span className="font-display text-2xl tracking-wide">{t.label}</span>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Duration Selection */}
          <section>
            <div className="bg-black text-white inline-block px-3 py-1 mb-4 font-display text-xl transform rotate-1">
              Step 2: How Long?
            </div>
            <div className="flex gap-3">
              {STORY_DURATIONS.map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`
                      flex-1 flex flex-col items-center gap-2 py-4 border-2 border-black rounded-lg font-display text-xl transition-all
                      ${duration === d.id 
                        ? 'bg-green-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' 
                        : 'bg-white text-gray-500 hover:bg-gray-50 shadow-sm'}
                    `}
                  >
                    <Icon size={24} strokeWidth={2.5} />
                    {d.label}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-10">
          {/* Moral Input */}
          <section className="flex-1">
            <div className="bg-black text-white inline-block px-3 py-1 mb-4 font-display text-xl transform -rotate-1">
              Step 3: The Big Lesson
            </div>
            <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_#EF4444] rounded-xl h-full flex flex-col justify-center">
              <label className="font-display text-3xl mb-4 block">What should the hero learn?</label>
              <input
                type="text"
                value={moral}
                onChange={(e) => setMoral(e.target.value)}
                placeholder="Ex: SHARING IS CARING"
                className="w-full text-3xl font-display p-4 border-b-4 border-black outline-none bg-yellow-50 placeholder-gray-400 focus:bg-yellow-100 transition-colors uppercase"
              />
              <p className="mt-4 font-body text-gray-500 font-bold text-sm">
                Type something like &quot;Bravery&quot; or &quot;Honesty&quot;
              </p>
            </div>
          </section>

          {/* Submit */}
          <div className="pt-4">
            <Button 
              onClick={() => onGenerate({ theme: theme as any, duration: duration as any, moral })} 
              variant={canGenerate ? 'action' : 'secondary'}
              disabled={!canGenerate}
              className={`w-full py-6 text-3xl`}
            >
              CREATE MAGIC <ArrowRight size={32} strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateView;

