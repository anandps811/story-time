'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, Zap, Cloud } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const router = useRouter();

  return (
    <PageContainer>
      <Navbar />
      
      <main className="pb-10">
        <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-10 left-10 text-blue-500 opacity-20 transform -rotate-12">
            <Cloud size={120} fill="currentColor" />
          </div>
          <div className="absolute bottom-20 right-10 text-yellow-500 opacity-20 transform rotate-12">
            <Star size={140} fill="currentColor" />
          </div>

          <div className="z-10 max-w-3xl mx-auto">
            <div className="inline-block bg-black text-white px-4 py-2 rounded-none border-2 border-black mb-6 transform -rotate-2 shadow-[4px_4px_0px_0px_#10B981]">
              <span className="font-display text-xl tracking-widest">For Cool Kids Only!</span>
            </div>
            
            <h1 className="font-display text-8xl md:text-9xl text-black mb-2 leading-[0.9]">
              STORY
            </h1>
            <h1 className="font-display text-8xl md:text-9xl text-transparent stroke-black mb-10 leading-[0.9]" style={{ WebkitTextStroke: '3px black' }}>
              TIME
            </h1>
            
            <p className="font-body font-bold text-xl md:text-2xl text-black mb-12 max-w-lg mx-auto bg-white/80 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              Pick a theme, get crazy, and read a super awesome story!
            </p>

            <Button 
              onClick={() => router.push('/home/create')} 
              variant="primary" 
              className="text-2xl py-6 px-12 mx-auto"
            >
              Let&apos;s Go! <Zap size={24} fill="black" />
            </Button>
          </div>
        </div>
      </main>
    </PageContainer>
  );
}

