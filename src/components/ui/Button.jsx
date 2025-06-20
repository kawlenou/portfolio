import React from 'react';

export default function Button({ children, variant = 'primary', ...props }) {
  const base = 'px-4 py-2 rounded-lg font-semibold transition-colors duration-200';

  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    secondary: 'bg-secondary text-dark hover:bg-gray-300',
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}