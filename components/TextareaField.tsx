import React from 'react';

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fullWidth?: boolean;
  rows?: number;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({ label, name, value, onChange, fullWidth = false, rows = 4 }) => {
  const isFullWidth = fullWidth;
  return (
    <div className={isFullWidth ? 'col-span-1 md:col-span-2' : ''}>
      <label htmlFor={name} className="block text-xs font-medium text-gray-600">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        spellCheck="true"
        className="mt-1 p-1 w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-sm text-gray-800"
      />
    </div>
  );
};