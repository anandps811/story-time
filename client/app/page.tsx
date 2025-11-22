'use client';

import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  Clock, 
  Rocket, 
  Ghost, 
  Crown, 
  Smile, 
  ArrowRight, 
  Home, 
  ChevronLeft,
  Zap,
  Cloud
} from 'lucide-react';

// --- Styled Components & Assets ---

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;500;700&display=swap');
  
  .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px; }
  .font-body { font-family: 'Poppins', sans-serif; }
  
  /* Custom Scrollbar for the bold look */
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; border-left: 2px solid black; }
  ::-webkit-scrollbar-thumb { background: #000; border: 2px solid #fff; }
`;

// Vibrant Pop Palette
const THEMES = [
  { id: 'fantasy', label: 'Fairy Tale', icon: Crown, bg: 'bg-pink-400', text: 'text-white', shadow: 'shadow-pink-900' },
  { id: 'space', label: 'Space', icon: Rocket, bg: 'bg-blue-500', text: 'text-white', shadow: 'shadow-blue-900' },
  { id: 'adventure', label: 'Adventure', icon: Zap, bg: 'bg-yellow-400', text: 'text-black', shadow: 'shadow-yellow-900' },
  { id: 'spooky', label: 'Spooky', icon: Ghost, bg: 'bg-purple-500', text: 'text-white', shadow: 'shadow-purple-900' },
];

const DURATIONS = [
  { id: 'short', label: 'Quick', icon: Sparkles },
  { id: 'medium', label: 'Normal', icon: Star },
  { id: 'long', label: 'Long', icon: Clock },
];

const generateMockStory = (theme: string, moral: string) => {
  const titles = {
    fantasy: "The Knight Who Loved Disco",
    space: "Pizza Party on Mars",
    adventure: "The Floor is Lava!",
    spooky: "The Ghost with the Golden Shoes"
  };

  return {
    title: titles[theme as keyof typeof titles] || "SUPER STORY!",
    content: [
      `BOOM! The day started with a giant noise. But don't worry, it was just a friendly dragon sneezing glitter all over the town square!`,
      `Everyone was running around. It was chaos! "Who will clean this up?" shouted the Mayor. That's when our hero stepped up. They remembered the golden rule of ${moral || 'teamwork'}.`,
      `"I can help!" shouted our hero. They grabbed a giant vacuum cleaner and got to work. It was hard, messy work, but they didn't give up.`,
      `Suddenly, all the townspeople grabbed brooms and joined in! Why? Because they saw how cool it is to practice ${moral || 'teamwork'}.`,
      `In the end, the town was sparkling clean, and they threw a giant dance party to celebrate. The End!`
    ]
  };
};

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '' }: { children: React.ReactNode, onClick: () => void, variant?: 'primary' | 'secondary' | 'action' | 'danger', className?: string }) => {
  // Hard shadows and borders for Pop style
  const baseStyle = "relative transition-all duration-150 font-display text-xl tracking-wider uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] rounded-lg px-8 py-4 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-300 text-black",
    secondary: "bg-white hover:bg-gray-50 text-black",
    action: "bg-blue-500 hover:bg-blue-400 text-white",
    danger: "bg-red-500 hover:bg-red-400 text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Card = ({ children, selected, onClick, themeStyles }: { children: React.ReactNode, selected: boolean, onClick: () => void, themeStyles: { bg: string, text: string, shadow: string } }) => {
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

// --- Views ---

const HomeView = ({ onStart }: { onStart: () => void }) => (
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

      <Button onClick={onStart} variant="primary" className="text-2xl py-6 px-12 mx-auto">
        Let&apos;s Go! <Zap size={24} fill="black" />
      </Button>
    </div>
  </div>
);

const CreateView = ({ onGenerate, onBack }: { onGenerate: (params: { theme: string, duration: string, moral: string }) => void, onBack: () => void }) => {
  const [theme, setTheme] = useState('');
  const [duration, setDuration] = useState('medium');
  const [moral, setMoral] = useState('');

  const canGenerate = theme && moral.length > 2;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="p-3 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all rounded-lg">
          <ChevronLeft size={32} color="black" strokeWidth={3} />
        </button>
        <h2 className="font-display text-5xl text-black">BUILD YOUR STORY</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-10">
          {/* Theme Selection */}
          <section>
            <div className="bg-black text-white inline-block px-3 py-1 mb-4 font-display text-xl transform -rotate-1">Step 1: Pick a Vibe</div>
            <div className="grid grid-cols-2 gap-4">
              {THEMES.map((t) => {
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
            <div className="bg-black text-white inline-block px-3 py-1 mb-4 font-display text-xl transform rotate-1">Step 2: How Long?</div>
            <div className="flex gap-3">
              {DURATIONS.map((d) => {
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
                )
              })}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-10">
            {/* Moral Input */}
            <section className="flex-1">
                <div className="bg-black text-white inline-block px-3 py-1 mb-4 font-display text-xl transform -rotate-1">Step 3: The Big Lesson</div>
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
                    onClick={() => onGenerate({ theme, duration, moral })} 
                    variant={canGenerate ? 'action' : 'secondary'}
                    className={`w-full py-6 text-3xl ${!canGenerate && 'opacity-50 cursor-not-allowed'}`}
                >
                    CREATE MAGIC <ArrowRight size={32} strokeWidth={3} />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

const StoryView = ({ data, onHome }: { data: { title: string, content: string[] }, onHome: () => void }) => {
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

const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="relative mb-10">
            <div className="absolute inset-0 bg-yellow-400 translate-x-2 translate-y-2 rounded-full"></div>
            <div className="relative bg-white border-4 border-black p-6 rounded-full animate-bounce">
                <Zap size={64} className="text-black" fill="yellow" />
            </div>
        </div>
        <h2 className="font-display text-6xl text-black mb-2">
            MAKING MAGIC...
        </h2>
        <div className="w-64 h-4 border-2 border-black rounded-full overflow-hidden bg-white">
            <div className="h-full bg-blue-500 animate-[wiggle_1s_ease-in-out_infinite]"></div>
        </div>
        <style>{`
            @keyframes wiggle {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
            }
        `}</style>
    </div>
);

export default function App() {
  const [view, setView] = useState('home');
  const [storyData, setStoryData] = useState<{ title: string, content: string[] } | null>(null);

  const handleGenerateStory = (params: { theme: string, moral: string } & { duration: string }) => {
    setView('loading');
    setTimeout(() => {
        setStoryData(generateMockStory(params.theme, params.moral));
        setView('story');
    }, 2500);
  }; 

  return (
    <div className="min-h-screen bg-emerald-50 text-black font-body selection:bg-yellow-400 selection:text-black bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
      <style>{FONTS}</style>
      
      {/* Header */}
      <nav className="p-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#FBBF24]">
                <span className="font-display text-xl">ST</span>
            </div>
            <span className="font-display text-2xl tracking-wider hidden sm:block">StoryTime</span>
        </div>
      </nav>

      <main className="pb-10">
        {view === 'home' && <HomeView onStart={() => setView('create')} />}
        {view === 'create' && <CreateView onGenerate={handleGenerateStory} onBack={() => setView('home')} />}
        {view === 'loading' && <Loader />}
        {view === 'story' && storyData ? <StoryView data={storyData} onHome={() => setView('home')} /> : null}
      </main>
    </div>
  );
}