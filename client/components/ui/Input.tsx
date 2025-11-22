import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  icon?: LucideIcon;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  icon: Icon,
  required = false,
  className = ''
}) => {
  return (
    <div>
      {label && (
        <label className="font-display text-2xl mb-3 block text-black">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon size={24} className="text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full ${Icon ? 'pl-14' : 'pl-4'} pr-4 py-4 text-lg font-body 
            border-b-4 border-black outline-none bg-yellow-50 
            placeholder-gray-400 focus:bg-yellow-100 transition-colors 
            rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            ${className}
          `}
        />
      </div>
    </div>
  );
};

export default Input;

