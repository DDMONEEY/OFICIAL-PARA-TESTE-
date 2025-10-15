
import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  placeholder?: string;
  spellCheck?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, fullWidth = false, placeholder, spellCheck = false }) => {
  return (
    <div className={fullWidth ? 'col-span-1 md:col-span-2' : ''}>
      <label htmlFor={name} className="block text-xs font-medium text-gray-600">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        spellCheck={spellCheck}
        className="h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
      />
    </div>
  );
};
