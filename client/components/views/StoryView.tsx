import React, { useState } from 'react';
import { ArrowRight, Home, Smile } from 'lucide-react';
import { StoryData } from '@/lib/types';
import Button from '../ui/Button';

interface StoryViewProps {
  data: StoryData;
  onHome: () => void;
}

const StoryView: React.FC<StoryViewProps> = ({ data, onHome }) => {
  const [page, setPage] = useState(0);
  const content = data.content;
  const isLastPage = page === content.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 min-h-screen flex flex-col">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-8">
        <Button variant="secondary" onClick={onHome} className="py-2 px-4 text-lg">
          <Home size={20} className="mr-2" /> EXIT
        </Button>
        <div className="bg-black text-white font-display px-4 py-2 rounded-lg text-xl tracking-widest border-2 border-white shadow-lg">
          PAGE {page + 1} / {content.length}
        </div>
      </div>

      {/* Story Book/Card */}
      <div className="flex-1 bg-white border-4 border-black shadow-[12px_12px_0px_0px_#3B82F6] rounded-2xl p-8 md:p-16 flex flex-col items-center text-center relative overflow-hidden">
        {/* Page Content */}
        <div className="z-10 max-w-2xl">
          {page === 0 && (
            <div className="mb-10">
              <span className="inline-block bg-yellow-400 border-2 border-black px-4 py-1 font-display text-xl mb-4 transform -rotate-2 shadow-[2px_2px_0px_0px_black]">
                Read this loud!
              </span>
              <h1 className="font-display text-6xl md:text-7xl text-black leading-[0.95] mb-6">
                {data.title}
              </h1>
              <div className="h-2 w-32 bg-black mx-auto rounded-full"></div>
            </div>
          )}

          <p className="font-body text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
            {content[page]}
          </p>

          {isLastPage && (
            <div className="mt-12 p-8 bg-green-400 border-2 border-black shadow-[6px_6px_0px_0px_black] transform rotate-1">
              <h3 className="font-display text-4xl mb-2">YOU DID IT!</h3>
              <p className="font-body font-bold text-lg">Great reading, superstar!</p>
            </div>
          )}
        </div>

        {/* Background Decoration inside card */}
        <div className="absolute -bottom-10 -right-10 opacity-5">
          <Smile size={300} />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex justify-between items-center gap-4">
        <Button 
          variant="secondary" 
          onClick={() => setPage(p => Math.max(0, p - 1))}
          className={`${page === 0 ? 'invisible' : ''} flex-1`}
        >
          PREV
        </Button>

        {isLastPage ? (
          <Button onClick={onHome} variant="primary" className="flex-2">
            READ ANOTHER?
          </Button>
        ) : (
          <Button onClick={() => setPage(p => Math.min(content.length - 1, p + 1))} variant="primary" className="flex-2">
            NEXT PAGE <ArrowRight size={24} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StoryView;

