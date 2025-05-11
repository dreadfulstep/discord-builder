"use client"

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
  const getStyleClass = () => {
    switch (style) {
      case 1: return 'discord-button primary';
      case 2: return 'discord-button secondary';     // Secondary - gray
      case 3: return 'discord-button success';       // Success - green
      case 4: return 'discord-button danger';        // Danger - red
      case 5: return 'discord-button link';          // Link - gray with link styling
      case 6: return 'discord-button premium';       // Premium - purple/special
      default: return 'discord-button secondary';    // Default fallback
    }
  };

  const getButtonAttributes = () => {
    // For link buttons (style 5)
    if (style === 5 && url) {
      return {
        as: 'a',
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer'
      };
    }
    
    // For other button types
    return {
      type: 'button',
      'data-custom-id': custom_id,
      ...(style === 6 && sku_id ? { 'data-sku-id': sku_id } : {})
    };
  };

  return style === 5 && url ? (
    <a 
      className={`${getStyleClass()} ${disabled ? 'disabled' : ''}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {emoji && <span className="button-emoji">{emoji}</span>}
      {label && <span className="button-label">{label}</span>}
    </a>
  ) : (
    <button 
      className={`${getStyleClass()} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      type="button"
      data-custom-id={custom_id}
      {...(style === 6 && sku_id ? { 'data-sku-id': sku_id } : {})}
    >
      {emoji && <span className="button-emoji">{emoji}</span>}
      {label && <span className="button-label">{label}</span>}
    </button>
  );
};

export default Button;