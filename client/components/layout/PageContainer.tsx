import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`min-h-screen bg-emerald-50 text-black font-body selection:bg-yellow-400 selection:text-black ${className}`}
      style={{
        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
        backgroundSize: '16px 16px'
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;

