

import React from 'react';

interface FieldProps {
  label: string;
  tag: string;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({ label, tag, className = '' }) => {
  return (
    <div className={`border border-gray-400 p-1 ${className}`}>
      <label className="block text-[11px] font-medium text-gray-500 uppercase">{label}</label>
      <div className="flex items-center min-h-[20px] px-1 text-xs text-gray-800 break-all uppercase">
        {tag || '\u00A0'}
      </div>
    </div>
  );
};
