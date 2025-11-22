'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Smile, RefreshCcw } from 'lucide-react';
import { StoryData } from '@/lib/types';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';

export default function StoryPage() {
  const router = useRouter();
  const [storyData, setStoryData] = useState<StoryData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('storyData');
    if (stored) {
      setStoryData(JSON.parse(stored) as StoryData);
    } else {
      router.push('/home/create');
    }
  }, [router]);

  if (!storyData) {
    return null; 
  }

  return (
    // 1. Force the PageContainer to be full screen and prevent body scroll
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      
      {/* Navbar stays at the top */}
      <div className="flex-none">
        <Navbar showBackButton onBackClick={() => router.push('/home')} />
      </div>
      
      <main className="flex-1 flex flex-col min-h-0 w-full max-w-4xl mx-auto px-4 pb-6">
        
        {/* 2. Top Controls (Sticky/Fixed relative to the card) */}
        <div className="flex-none flex justify-between items-center py-6">
          <Button 
            variant="secondary" 
            onClick={() => router.push('/home')} 
            className="py-2 px-4 text-lg"
          >
            <Home size={20} className="mr-2" /> EXIT
          </Button>
        </div>

        {/* 3. Story Card - Takes remaining height and handles internal scroll */}
        <div className="flex-1 bg-white border-4 border-black shadow-[12px_12px_0px_0px_#3B82F6] rounded-2xl relative overflow-hidden flex flex-col">
          
          {/* Scrollable Container inside the card border */}
          <div className="overflow-y-auto flex-1 p-8 md:p-16 scrollbar-hide">
            
            {/* Header */}
            <div className="text-center mb-12 border-b-4 border-black/10 pb-10">
              <span className="inline-block bg-yellow-400 border-2 border-black px-4 py-1 font-display text-xl mb-6 transform -rotate-2 shadow-[2px_2px_0px_0px_black]">
                Read this loud!
              </span>
              <h1 className="font-display text-5xl md:text-7xl text-black leading-[0.95] mb-6">
                {storyData.title}
              </h1>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
              {storyData.content.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="font-body text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed first-letter:text-5xl first-letter:font-display first-letter:mr-1"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer / End of Story */}
            <div className="mt-16 flex flex-col items-center text-center relative z-10">
              <div className="p-8 bg-green-400 border-2 border-black shadow-[6px_6px_0px_0px_black] transform rotate-1 mb-10 max-w-md w-full">
                <h3 className="font-display text-4xl mb-2">THE END!</h3>
                <p className="font-body font-bold text-lg">Great reading, superstar!</p>
              </div>

              <Button 
                onClick={() => router.push('/home/create')} 
                variant="primary" 
                className="w-full md:w-auto text-xl py-4 px-8"
              >
                <RefreshCcw className="mr-2" /> READ ANOTHER STORY
              </Button>
            </div>

            {/* Background Decoration (Fixed to bottom right of scrollable area) */}
            <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
              <Smile size={300} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}