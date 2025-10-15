import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="border border-slate-300 rounded-lg shadow-sm overflow-hidden">
      <h2 className="px-3 py-2 text-xs font-bold text-white bg-slate-700 tracking-wide uppercase flex justify-center items-center text-center">
        {title}
      </h2>
      <div className="px-3 py-2 bg-white">
        {children}
      </div>
    </div>
  );
};