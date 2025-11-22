import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface NavbarProps {
  showAuthButtons?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  showAuthButtons = false, 
  showBackButton = false,
  onBackClick 
}) => {
  return (
    <nav className="p-4 flex justify-between items-center max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#FBBF24]">
          <span className="font-display text-xl">ST</span>
        </div>
        <span className="font-display text-2xl tracking-wider hidden sm:block">StoryTime</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {showAuthButtons && (
          <>
            <Link href="/login">
              <Button variant="secondary" className="py-2 px-6 text-lg">
                LOG IN
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="action" className="py-2 px-6 text-lg">
                SIGN UP
              </Button>
            </Link>
          </>
        )}
        
        {showBackButton && (
          onBackClick ? (
            <button 
              onClick={onBackClick}
              className="p-3 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
                className="text-black"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          ) : (
            <Link href="/" className="p-3 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all rounded-lg">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
                className="text-black"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;

