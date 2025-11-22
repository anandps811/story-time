import React from 'react';
import { Zap } from 'lucide-react';

const Loader: React.FC = () => (
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
      <div className="h-full bg-blue-500 animate-wiggle"></div>
    </div>
  </div>
);

export default Loader;

