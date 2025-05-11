"use client"

import { ArrowUpRightFromSquare } from 'lucide-react';
import React from 'react';

type ButtonProps = {
  style: 1 | 2 | 3 | 4 | 5 | 6;
  label?: string;
  emoji?: string;
  custom_id: string;
  sku_id?: string;
  url?: string;
  disabled?: boolean;
};

const Button = ({ style, label, emoji, custom_id, sku_id, url, disabled = false }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center min-w-[60px] min-h-[32px] px-4 py-[2px] rounded-[3px] text-sm font-medium leading-4 cursor-pointer transition-colors duration-150 focus:outline-none";
  
  const getStyleClasses = () => {
    switch (style) {
      case 1: // Primary
        return 'bg-[#5865F2] text-white hover:bg-[#4752C4]';
      case 2: // Secondary
        return 'bg-[#27272B] border border-border text-white hover:bg-[#313136]';
      case 3: // Success
        return 'bg-[#3BA55D] text-white hover:bg-[#2D8048]';
      case 4: // Danger
        return 'bg-[#ED4245] text-white hover:bg-[#C03537]';
      case 5: // Link
        return 'bg-[#27272B] border border-border text-white hover:bg-[#313136]';
      case 6: // Premium
        return 'bg-[#4A6BEB] text-white hover:bg-[#3650b6]';
      default:
        return 'bg-[#27272B] border border-border text-white hover:bg-[#313136]';
    }
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-inherit';

  const buttonContent = (
    <>
      {emoji && <span className="mr-2">{emoji}</span>}
      {label && <span>{label}</span>}
    </>
  );

  return style === 5 && url ? (
    <a
      className={`${baseClasses} ${getStyleClasses()} ${disabled ? disabledClasses : ''} gap-2`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <ArrowUpRightFromSquare className="h-4 w-4" />
    </a>
  ) : (
    <button
      className={`${baseClasses} ${getStyleClasses()} ${disabled ? disabledClasses : ''}`}
      disabled={disabled}
      type="button"
      data-custom-id={custom_id}
      {...(style === 6 && sku_id ? { 'data-sku-id': sku_id } : {})}
    >
      {buttonContent}
    </button>
  );
};

export default Button;